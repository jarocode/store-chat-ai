"use client";

import type React from "react";

import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

const MainContent = styled.main<{ $sidebarOpen: boolean }>`
  flex: 1;
  padding: 1rem;
  transition: margin-left 0.2s ease; /* Faster transition */
  width: 100%;

  @media (min-width: 640px) {
    padding: 1.5rem;
  }

  @media (min-width: 1024px) {
    margin-left: ${(props) => (props.$sidebarOpen ? "280px" : "0")};
    padding-right: 2rem; /* Add gap from the right side */
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);

    // Close sidebar on mobile by default
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when navigating on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [pathname]);

  // Memoize the sidebar component to prevent unnecessary re-renders
  const sidebarComponent = useMemo(
    () => <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />,
    [sidebarOpen]
  );

  if (!mounted) return null;

  return (
    <DashboardContainer>
      {sidebarComponent}
      <MainContent $sidebarOpen={sidebarOpen}>
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <ContentWrapper>{children}</ContentWrapper>
      </MainContent>
    </DashboardContainer>
  );
}
