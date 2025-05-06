"use client";

import type React from "react";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

import { ModeToggle } from "./mode-toggle";

import Logo from "./logo";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1.5rem;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 50% 0%,
      ${(props) => props.theme.colors.primaryLight},
      transparent 70%
    );
    opacity: 0.6;
    z-index: 0;
  }
`;

const LoginCard = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  padding: 2.5rem;
  border-radius: ${(props) => props.theme.radii.xl};
  background: ${(props) => props.theme.colors.card};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  box-shadow: ${(props) => props.theme.shadows.elevated};
  backdrop-filter: blur(10px);
  border: 1px solid ${(props) => props.theme.colors.border};

  @media (max-width: 640px) {
    padding: 2rem 1.5rem;
  }
`;

const LogoWrapper = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Tagline = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.textMuted};
  margin-bottom: 2.5rem;
  text-align: center;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
`;

const Input = styled.input`
  padding: 0.875rem 1rem;
  border-radius: ${(props) => props.theme.radii.md};
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.inputBackground};
  color: ${(props) => props.theme.colors.text};
  font-size: 1rem;
  width: 100%;
  transition: all ${(props) => props.theme.transitions.normal};
  box-shadow: ${(props) => props.theme.shadows.sm};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: ${(props) => props.theme.shadows.highlight};
  }
`;

const Button = styled(motion.button)`
  padding: 0.875rem 1.5rem;
  border-radius: ${(props) => props.theme.radii.md};
  background: ${(props) => props.theme.colors.primaryGradient};
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  width: 100%;
  transition: all ${(props) => props.theme.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: ${(props) => props.theme.shadows.md};

  &:hover {
    box-shadow: ${(props) => props.theme.shadows.lg};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ThemeToggleWrapper = styled.div`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 10;
`;

const Decorations = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

const Circle = styled.div<{
  size: number;
  top: string;
  left: string;
  color: string;
}>`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  background: ${(props) => props.color};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  opacity: 0.1;
`;

export default function LoginPage() {
  const [storeUrl, setStoreUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    setIsLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const storeHostName = new URL(storeUrl).host;

    // kick off OAuth by redirecting to your NestJS endpoint
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/shopify?shop=${storeHostName}`;
  };

  if (!mounted) return null;

  return (
    <LoginContainer>
      <Decorations>
        <Circle size={300} top="-150px" left="-150px" color="#4f46e5" />
        <Circle size={200} top="70%" left="80%" color="#4f46e5" />
        <Circle size={100} top="40%" left="10%" color="#4f46e5" />
      </Decorations>

      <ThemeToggleWrapper>
        <ModeToggle />
      </ThemeToggleWrapper>

      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }} // Faster animation
      >
        <LogoWrapper>
          <Logo size="large" />
        </LogoWrapper>
        <Tagline>
          Connect your store to create an AI-powered shopping assistant
        </Tagline>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="store-url">Your Shopify Store URL</Label>
            <Input
              id="store-url"
              type="text"
              placeholder="yourstore.myshopify.com"
              value={storeUrl}
              onChange={(e) => setStoreUrl(e.target.value.trim())}
              required
            />
          </InputGroup>

          <Button
            type="submit"
            disabled={isLoading || !storeUrl}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 0.8,
                    ease: "linear",
                  }} // Faster animation
                >
                  <LogIn size={20} />
                </motion.div>
                Connecting...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Login with Shopify
              </>
            )}
          </Button>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
}
