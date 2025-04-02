"use client"

import styled from "styled-components"
import { Menu, Bell, User, Search } from "lucide-react"
import { ModeToggle } from "../mode-toggle"
import { motion } from "framer-motion"

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 0;
  margin-bottom: 2rem;
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: ${(props) => props.theme.radii.md};
  transition: all ${(props) => props.theme.transitions.fast};

  &:hover {
    background: ${(props) => props.theme.colors.sidebarHoverBackground};
  }

  @media (min-width: 1024px) {
    display: none;
  }
`

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  font-family: ${(props) => props.theme.fonts.heading};
  letter-spacing: -0.02em;
  background: ${(props) => props.theme.colors.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const SearchContainer = styled.div`
  position: relative;
  margin-left: 1.5rem;
  display: none;
  
  @media (min-width: 768px) {
    display: block;
  }
`

const SearchInput = styled.input`
  padding: 0.5rem 0.75rem 0.5rem 2.5rem;
  border-radius: ${(props) => props.theme.radii.full};
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.inputBackground};
  color: ${(props) => props.theme.colors.text};
  font-size: 0.875rem;
  width: 200px;
  transition: all ${(props) => props.theme.transitions.normal};
  box-shadow: ${(props) => props.theme.shadows.sm};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: ${(props) => props.theme.shadows.highlight};
    width: 250px;
  }
`

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.colors.textMuted};
  pointer-events: none;
`

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: ${(props) => props.theme.radii.md};
  transition: all ${(props) => props.theme.transitions.fast};
  position: relative;

  &:hover {
    background: ${(props) => props.theme.colors.sidebarHoverBackground};
  }
`

const NotificationBadge = styled.div`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.error};
  border: 2px solid ${(props) => props.theme.colors.card};
`

const UserAvatar = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.primaryGradient};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${(props) => props.theme.shadows.md};
  transition: all ${(props) => props.theme.transitions.fast};
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${(props) => props.theme.shadows.lg};
  }
`

interface HeaderProps {
  toggleSidebar: () => void
}

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <HeaderContainer>
      <LeftSection>
        <MenuButton onClick={toggleSidebar}>
          <Menu size={20} />
        </MenuButton>
        <PageTitle>Dashboard</PageTitle>

        <SearchContainer>
          <SearchIconWrapper>
            <Search size={16} />
          </SearchIconWrapper>
          <SearchInput placeholder="Search..." />
        </SearchContainer>
      </LeftSection>

      <RightSection>
        <IconButton>
          <Bell size={20} />
          <NotificationBadge />
        </IconButton>
        <ModeToggle />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <UserAvatar>
            <User size={16} />
          </UserAvatar>
        </motion.div>
      </RightSection>
    </HeaderContainer>
  )
}

