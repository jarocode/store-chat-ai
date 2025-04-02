import type React from "react"
import { Inter } from "next/font/google"
import StyledComponentsRegistry from "@/lib/registry"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

// Import Inter with all weights for better typography
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <StyledComponentsRegistry>
          <ThemeProvider>
            {children}
            <Toaster />
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
