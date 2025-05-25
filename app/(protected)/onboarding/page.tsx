// app/onboarding/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { apiRequest } from "@/lib/api";
import { useShop } from "../context/shop-context";

// ----- Styled Components -----
const OnboardingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
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
      ${({ theme }) => theme.colors.primaryLight},
      transparent 70%
    );
    opacity: 0.6;
    z-index: 0;
  }
`;

const OnboardingCard = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  padding: 3rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.card};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
  box-shadow: ${({ theme }) => theme.shadows.elevated};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 640px) {
    padding: 2rem 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.heading};
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 3rem;
  max-width: 400px;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.colors.progressBarBackground};
  border-radius: ${({ theme }) => theme.radii.full};
  margin-bottom: 2rem;
  overflow: hidden;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const ProgressBarFill = styled(motion.div)`
  height: 100%;
  background: ${({ theme }) => theme.colors.primaryGradient};
  border-radius: ${({ theme }) => theme.radii.full};
  box-shadow: 0 0 8px ${({ theme }) => theme.colors.primary};
`;

const StepContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 3rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 14px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.border};
    z-index: 0;
  }

  @media (max-width: 640px) {
    &::before {
      top: 10px;
    }
  }
`;

const Step = styled.div<{ $active: boolean; $completed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  position: relative;
  z-index: 1;

  .step-number {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.875rem;
    background: ${({ $completed, theme }) =>
      $completed ? theme.colors.primary : theme.colors.card};
    color: ${({ $completed, $active, theme }) =>
      $completed
        ? "#fff"
        : $active
        ? theme.colors.primary
        : theme.colors.textMuted};
    transition: all ${({ theme }) => theme.transitions.normal};
    border: 2px solid
      ${({ $completed, $active, theme }) =>
        $completed || $active ? theme.colors.primary : theme.colors.border};
    box-shadow: ${({ $completed, $active, theme }) =>
      $completed || $active ? theme.shadows.md : "none"};

    @media (max-width: 640px) {
      width: 24px;
      height: 24px;
      font-size: 0.75rem;
    }
  }

  .step-label {
    font-size: 0.875rem;
    color: ${({ $completed, $active, theme }) =>
      $completed || $active ? theme.colors.text : theme.colors.textMuted};
    font-weight: ${({ $completed, $active }) =>
      $completed || $active ? "600" : "400"};
    text-align: center;

    @media (max-width: 640px) {
      font-size: 0.75rem;
    }
  }
`;

const StatusText = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const PulsingText = styled(motion.div)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (min-width: 640px) {
    font-size: 1rem;
  }
`;

const RetryButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// ----- Constants & Steps -----
const steps = [
  { id: 1, label: "Connect" },
  { id: 2, label: "Import Data" },
  { id: 3, label: "Setup AI" },
  { id: 4, label: "Complete" },
];
const MAX_RETRIES = 3;
const BASE_DELAY = 500; // ms

// ----- Component -----
export default function OnboardingPage() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [statusText, setStatusText] = useState(
    "Connecting to your Shopify store..."
  );
  const [shop, setShop] = useState("");
  const [connectError, setConnectError] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const router = useRouter();
  const shopLink = useShop();

  // Exponential-backoff retry helper
  const retryApiRequest = async <T,>(
    options: Parameters<typeof apiRequest>[0],
    retries = MAX_RETRIES,
    delay = BASE_DELAY
  ): Promise<T> => {
    try {
      return await apiRequest<T>(options);
    } catch (err) {
      if (retries > 0) {
        setStatusText(
          `Error: ${
            err instanceof Error ? err.message : "Request failed"
          }, retrying...`
        );
        await new Promise((r) => setTimeout(r, delay));
        return retryApiRequest<T>(options, retries - 1, delay * 2);
      }
      throw err;
    }
  };

  // Initiate connection & ingestion
  const initiateConnect = async () => {
    console.log("connect initiated...");
    setConnectError(false);
    setIsRetrying(true);
    setStatusText("Connecting to your Shopify store...");
    try {
      console.log("shop data:", shopLink);
      setShop(shopLink);
      setCurrentStep(2);
      setStatusText("Importing your products and customers...");
      console.log("trying to ingest...");
      await retryApiRequest({
        url: "/shopify/ingest/all",
        method: "post",
        data: { shop: shopLink },
      });
    } catch (error) {
      console.log("connect error:", error);
      setConnectError(true);
      setStatusText("Failed to connect after multiple attempts.");
    } finally {
      setIsRetrying(false);
    }
  };

  // Kick off on mount
  useEffect(() => {
    initiateConnect();
  }, []);

  // Poll ingestion status
  useEffect(() => {
    if (!shop || connectError) return;
    const iv = setInterval(async () => {
      try {
        const data = await retryApiRequest<
          Record<string, { done: number; total: number }>
        >({ url: "/shopify/ingest/status", method: "post", data: { shop } });
        console.log("ingest status data:", data);
        const entries = Object.values(data);
        const total = entries.reduce((s, e) => s + e.total, 0);
        const done = entries.reduce((s, e) => s + e.done, 0);
        setProgress(total > 0 ? Math.round((done / total) * 100) : 0);

        if (
          ["products", "orders", "customers", "discounts"].every(
            (r) => data[r]?.done === data[r]?.total
          ) &&
          currentStep < 3
        ) {
          setCurrentStep(3);
          setStatusText("Setting up your AI chatbot...");
        }
        if (
          ["faqPages", "shopPolicies", "productFaqs", "blogArticles"].every(
            (r) => data[r]?.done === data[r]?.total
          ) &&
          currentStep < 4
        ) {
          setCurrentStep(4);
          setStatusText("Almost done...");
          setTimeout(() => router.push("/dashboard"), 800);
        }
      } catch {
        setStatusText("Error fetching progress, retrying...");
      }
    }, 2000);
    return () => clearInterval(iv);
  }, [shop, connectError, currentStep, router]);

  return (
    <OnboardingContainer>
      <OnboardingCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Title>Setting up your store</Title>
        <Subtitle>
          We're preparing your StoreChatAI chatbot. This may take a few moments.
        </Subtitle>

        <StepContainer>
          {steps.map((step) => (
            <Step
              key={step.id}
              $active={step.id === currentStep}
              $completed={step.id < currentStep}
            >
              <div className="step-number">
                {step.id < currentStep ? <CheckCircle2 size={14} /> : step.id}
              </div>
              <div className="step-label">{step.label}</div>
            </Step>
          ))}
        </StepContainer>

        <ProgressBarContainer>
          <ProgressBarFill
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        </ProgressBarContainer>

        <StatusText>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          >
            ⚙️
          </motion.div>
          {statusText}
        </StatusText>

        {connectError && (
          <RetryButton onClick={initiateConnect} disabled={isRetrying}>
            {isRetrying ? "Retrying..." : "Retry Connection"}
          </RetryButton>
        )}

        <PulsingText
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.98, 1, 0.98] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Please don't close this window
        </PulsingText>
      </OnboardingCard>
    </OnboardingContainer>
  );
}
