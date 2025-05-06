"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { apiRequest } from "@/lib/api";

const OnboardingContainer = styled.div`
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

const OnboardingCard = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  padding: 3rem;
  border-radius: ${(props) => props.theme.radii.xl};
  background: ${(props) => props.theme.colors.card};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
  box-shadow: ${(props) => props.theme.shadows.elevated};
  backdrop-filter: blur(10px);
  border: 1px solid ${(props) => props.theme.colors.border};

  @media (max-width: 640px) {
    padding: 2rem 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.heading};
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.textMuted};
  margin-bottom: 3rem;
  max-width: 400px;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: ${(props) => props.theme.colors.progressBarBackground};
  border-radius: ${(props) => props.theme.radii.full};
  margin-bottom: 2rem;
  overflow: hidden;
  position: relative;
  box-shadow: ${(props) => props.theme.shadows.sm};
`;

const ProgressBarFill = styled(motion.div)`
  height: 100%;
  background: ${(props) => props.theme.colors.primaryGradient};
  border-radius: ${(props) => props.theme.radii.full};
  box-shadow: 0 0 8px ${(props) => props.theme.colors.primary};
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
    background: ${(props) => props.theme.colors.border};
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
    background: ${(props) =>
      props.$completed
        ? props.theme.colors.primary
        : props.$active
        ? props.theme.colors.card
        : props.theme.colors.card};
    color: ${(props) =>
      props.$completed
        ? "white"
        : props.$active
        ? props.theme.colors.primary
        : props.theme.colors.textMuted};
    transition: all ${(props) => props.theme.transitions.normal};
    border: 2px solid
      ${(props) =>
        props.$completed || props.$active
          ? props.theme.colors.primary
          : props.theme.colors.border};
    box-shadow: ${(props) =>
      props.$completed || props.$active ? props.theme.shadows.md : "none"};

    @media (max-width: 640px) {
      width: 24px;
      height: 24px;
      font-size: 0.75rem;
    }
  }

  .step-label {
    font-size: 0.875rem;
    color: ${(props) =>
      props.$completed || props.$active
        ? props.theme.colors.text
        : props.theme.colors.textMuted};
    font-weight: ${(props) =>
      props.$completed || props.$active ? "600" : "400"};
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
  color: ${(props) => props.theme.colors.primary};
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
  color: ${(props) => props.theme.colors.textMuted};

  @media (min-width: 640px) {
    font-size: 1rem;
  }
`;

const steps = [
  { id: 1, label: "Connect" },
  { id: 2, label: "Import Data" },
  { id: 3, label: "Setup AI" },
  { id: 4, label: "Complete" },
];

export default function OnboardingPage() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [statusText, setStatusText] = useState(
    "Connecting to your Shopify store..."
  );
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const getShop = async () => {
    const { shop } = await apiRequest<{ shop: string }>({
      url: "/shop/me",
      method: "get",
    });
    console.log("shop", shop);
  };

  console.log("shop");

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    getShop();
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const simulateOnboarding = async () => {
      // Step 1: Connect
      await simulateStep(0, 25, "Connecting to your Shopify store...", 1);

      // Step 2: Import Data
      await simulateStep(25, 60, "Importing your products and customers...", 2);

      // Step 3: Setup AI
      await simulateStep(60, 90, "Setting up your AI chatbot...", 3);

      // Step 4: Complete
      await simulateStep(90, 100, "Almost done...", 4);

      // Redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 800); // Faster redirect
    };

    simulateOnboarding();
  }, [router, mounted]);

  const simulateStep = (
    start: number,
    end: number,
    status: string,
    step: number
  ) => {
    return new Promise<void>((resolve) => {
      setStatusText(status);
      setCurrentStep(step);

      const duration = 1500; // 1.5 seconds per step (faster)
      const interval = 50; // Update every 50ms
      const steps = duration / interval;
      const increment = (end - start) / steps;

      let current = start;
      const timer = setInterval(() => {
        current += increment;
        setProgress(Math.min(current, end));

        if (current >= end) {
          clearInterval(timer);
          resolve();
        }
      }, interval);
    });
  };

  if (!mounted) return null;

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
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "linear",
            }}
          >
            ⚙️
          </motion.div>
          {statusText}
        </StatusText>

        <PulsingText
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [0.98, 1, 0.98],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
          }}
        >
          Please don't close this window
        </PulsingText>
      </OnboardingCard>
    </OnboardingContainer>
  );
}
