"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import styled from "styled-components"
import { motion } from "framer-motion"

const ToggleButton = styled(motion.button)`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colors.modeToggleBackground};
  color: ${(props) => props.theme.colors.modeToggleIcon};
  border: 1px solid ${(props) => props.theme.colors.border};
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.normal};
  box-shadow: ${(props) => props.theme.shadows.md};
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${(props) => props.theme.colors.modeToggleHover};
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.lg};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, 
      ${(props) => props.theme.colors.primaryLight} 0%, 
      transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`

const IconWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <ToggleButton
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <IconWrapper
          initial={{ rotate: -30, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 30, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Sun size={20} />
        </IconWrapper>
      ) : (
        <IconWrapper
          initial={{ rotate: 30, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -30, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Moon size={20} />
        </IconWrapper>
      )}
    </ToggleButton>
  )
}

