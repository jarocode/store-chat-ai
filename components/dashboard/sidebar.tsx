"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, History, BarChart2, Settings, X, ChevronRight } from "lucide-react"
import { ModeToggle } from "../mode-toggle"
import Logo from "../logo"
import { memo } from "react"

const SidebarContainer = styled(motion.aside)<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background: ${(props) => props.theme.colors.sidebarBackground};
  color: ${(props) => props.theme.colors.sidebarText};
  z-index: 50;
  box-shadow: ${(props) => props.theme.shadows.lg};
  display: flex;
  flex-direction: column;
  transform: ${(props) => (props.isOpen ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1); /* Faster transition */
  border-right: 1px solid ${(props) => props.theme.colors.border};

  @media (min-width: 1024px) {
    transform: translateX(0);
    ${(props) =>
      !props.isOpen &&
      `
    transform: translateX(-100%);
  `}
  }
`

const SidebarOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${(props) => props.theme.colors.overlay};
  z-index: 40;
  backdrop-filter: blur(4px);
  display: block;

  @media (min-width: 1024px) {
    display: none;
  }
`

const SidebarHeader = styled.div`
  padding: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.sidebarText};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${(props) => props.theme.radii.md};
  transition: all ${(props) => props.theme.transitions.fast};
  
  &:hover {
    background: ${(props) => props.theme.colors.sidebarHoverBackground};
  }

  @media (min-width: 1024px) {
    display: none;
  }
`

const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 0;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.border};
    border-radius: 20px;
  }
`

const SidebarFooter = styled.div`
  padding: 1.25rem 1.75rem;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StoreInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const StoreName = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
`

const StoreUrl = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.textMuted};
`

const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 0.75rem;
`

const NavSection = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const NavSectionTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.textMuted};
  padding: 0 0.75rem;
  margin: 0 0 0.75rem 0;
  letter-spacing: 0.05em;
`

const NavItem = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: ${(props) => props.theme.radii.md};
  text-decoration: none;
  color: ${(props) => (props.$active ? props.theme.colors.sidebarActiveText : props.theme.colors.sidebarText)};
  background: ${(props) => (props.$active ? props.theme.colors.sidebarActiveBackground : "transparent")};
  transition: all ${(props) => props.theme.transitions.fast};
  font-weight: ${(props) => (props.$active ? "600" : "400")};
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${(props) =>
      props.$active ? props.theme.colors.sidebarActiveBackground : props.theme.colors.sidebarHoverBackground};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    transition: all ${(props) => props.theme.transitions.fast};
    color: ${(props) => (props.$active ? props.theme.colors.primary : props.theme.colors.textMuted)};
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: ${(props) => props.theme.colors.primary};
    opacity: ${(props) => (props.$active ? 1 : 0)};
    border-radius: 0 4px 4px 0;
    transition: all ${(props) => props.theme.transitions.fast};
  }
  
  &:hover::before {
    opacity: ${(props) => (props.$active ? 1 : 0.5)};
  }
`

const SidebarToggle = styled.button<{ $isOpen: boolean }>`
  position: fixed;
  left: ${(props) => (props.$isOpen ? "280px" : "0")};
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 56px;
  background: ${(props) => props.theme.colors.primaryGradient};
  border: none;
  border-radius: ${(props) => (props.$isOpen ? "0 8px 8px 0" : "8px")};
  color: white;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  transition: left 0.2s cubic-bezier(0.4, 0, 0.2, 1); /* Faster transition */
  z-index: 30;
  box-shadow: ${(props) => props.theme.shadows.md};

  @media (min-width: 1024px) {
    display: flex;
  }

  svg {
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1); /* Faster transition */
    transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0)")};
  }
  
  &:hover {
    box-shadow: ${(props) => props.theme.shadows.lg};
  }
`

const navItems = [
  {
    name: "Chatbot",
    path: "/dashboard",
    icon: MessageSquare,
  },
  {
    name: "History",
    path: "/dashboard/history",
    icon: History,
  },
  {
    name: "Analytics",
    path: "/dashboard/analytics",
    icon: BarChart2,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
]

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

// Using memo to prevent unnecessary re-renders
const Sidebar = memo(function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <SidebarOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }} // Faster animation
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <SidebarContainer
        isOpen={isOpen}
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }} // Faster animation
      >
        <SidebarHeader>
          <Logo />
          <CloseButton onClick={() => setIsOpen(false)}>
            <X size={18} />
          </CloseButton>
        </SidebarHeader>

        <SidebarContent>
          <NavSection>
            <NavSectionTitle>Main</NavSectionTitle>
            <NavMenu>
              {navItems.map((item) => (
                <NavItem key={item.path} href={item.path} $active={pathname === item.path}>
                  <item.icon />
                  {item.name}
                </NavItem>
              ))}
            </NavMenu>
          </NavSection>
        </SidebarContent>

        <SidebarFooter>
          <StoreInfo>
            <StoreName>Demo Store</StoreName>
            <StoreUrl>demo.myshopify.com</StoreUrl>
          </StoreInfo>
          <ModeToggle />
        </SidebarFooter>
      </SidebarContainer>

      <SidebarToggle $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <ChevronRight size={16} />
      </SidebarToggle>
    </>
  )
})

export default Sidebar

