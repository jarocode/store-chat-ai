"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider as StyledThemeProvider } from "styled-components"

type Theme = "dark" | "light"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

// Enhanced color palette with more sophisticated colors
const lightTheme = {
  colors: {
    background: "#f8fafc", // Slightly blue-tinted background
    card: "#ffffff",
    text: "#1e293b", // Slate-800
    textMuted: "#64748b", // Slate-500
    primary: "#4f46e5", // Indigo-600
    primaryLight: "rgba(79, 70, 229, 0.1)", // Indigo-600 with opacity
    primaryDark: "#4338ca", // Indigo-700
    primaryGradient: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)", // Indigo gradient
    border: "#e2e8f0", // Slate-200
    inputBackground: "#ffffff",
    modeToggleBackground: "#f1f5f9", // Slate-100
    modeToggleIcon: "#1e293b", // Slate-800
    modeToggleHover: "#e2e8f0", // Slate-200
    sidebarBackground: "#ffffff",
    sidebarText: "#1e293b", // Slate-800
    sidebarActiveBackground: "#f5f3ff", // Violet-50
    sidebarActiveText: "#4f46e5", // Indigo-600
    sidebarHoverBackground: "#f8fafc", // Slate-50
    progressBarBackground: "#e2e8f0", // Slate-200
    progressBarFill: "#4f46e5", // Indigo-600
    success: "#10b981", // Emerald-500
    error: "#ef4444", // Red-500
    warning: "#f59e0b", // Amber-500
    info: "#3b82f6", // Blue-500
    cardHover: "#f8fafc", // Slate-50
    focus: "rgba(79, 70, 229, 0.3)", // Indigo-600 with opacity for focus rings
    overlay: "rgba(15, 23, 42, 0.3)", // Slate-900 with opacity
    divider: "#f1f5f9", // Slate-100
  },
  shadows: {
    sm: "0 1px 2px rgba(15, 23, 42, 0.05)",
    md: "0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -1px rgba(15, 23, 42, 0.05)",
    lg: "0 10px 15px -3px rgba(15, 23, 42, 0.05), 0 4px 6px -2px rgba(15, 23, 42, 0.05)",
    xl: "0 20px 25px -5px rgba(15, 23, 42, 0.05), 0 10px 10px -5px rgba(15, 23, 42, 0.02)",
    highlight: "0 0 0 3px rgba(79, 70, 229, 0.15)", // Indigo highlight
    card: "0 1px 3px rgba(15, 23, 42, 0.05), 0 1px 2px rgba(15, 23, 42, 0.1)",
    elevated: "0 10px 30px rgba(15, 23, 42, 0.08)",
    subtle: "0 2px 8px rgba(15, 23, 42, 0.06)",
  },
  fonts: {
    heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  radii: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px",
  },
  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    normal: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "350ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
}

const darkTheme = {
  colors: {
    background: "#0f172a", // Slate-900
    card: "#1e293b", // Slate-800
    text: "#f1f5f9", // Slate-100
    textMuted: "#94a3b8", // Slate-400
    primary: "#6366f1", // Indigo-500 (brighter for dark mode)
    primaryLight: "rgba(99, 102, 241, 0.15)", // Indigo-500 with opacity
    primaryDark: "#4f46e5", // Indigo-600
    primaryGradient: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)", // Indigo gradient for dark mode
    border: "#334155", // Slate-700
    inputBackground: "#1e293b", // Slate-800
    modeToggleBackground: "#334155", // Slate-700
    modeToggleIcon: "#f1f5f9", // Slate-100
    modeToggleHover: "#475569", // Slate-600
    sidebarBackground: "#1e293b", // Slate-800
    sidebarText: "#f1f5f9", // Slate-100
    sidebarActiveBackground: "#312e81", // Indigo-900
    sidebarActiveText: "#a5b4fc", // Indigo-300
    sidebarHoverBackground: "#334155", // Slate-700
    progressBarBackground: "#334155", // Slate-700
    progressBarFill: "#6366f1", // Indigo-500
    success: "#10b981", // Emerald-500
    error: "#ef4444", // Red-500
    warning: "#f59e0b", // Amber-500
    info: "#3b82f6", // Blue-500
    cardHover: "#334155", // Slate-700
    focus: "rgba(99, 102, 241, 0.3)", // Indigo-500 with opacity for focus rings
    overlay: "rgba(15, 23, 42, 0.5)", // Slate-900 with opacity
    divider: "#334155", // Slate-700
  },
  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.1)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.06)",
    highlight: "0 0 0 3px rgba(99, 102, 241, 0.25)", // Indigo highlight for dark mode
    card: "0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.2)",
    elevated: "0 10px 30px rgba(0, 0, 0, 0.25)",
    subtle: "0 2px 8px rgba(0, 0, 0, 0.15)",
  },
  fonts: {
    heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  radii: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px",
  },
  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    normal: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "350ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as Theme | null

    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // Check system preference
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark")
      }
    }
  }, [storageKey])

  useEffect(() => {
    localStorage.setItem(storageKey, theme)

    // Update data-theme attribute on document.body
    document.documentElement.setAttribute("data-theme", theme)

    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme, storageKey])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      <StyledThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>{children}</StyledThemeProvider>
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}

