"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import styled from "styled-components"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  MessageSquare,
  Calendar,
  User,
  Bot,
  Clock,
  Download,
  Mail,
  LucideTag,
  DollarSign,
  ShoppingCart,
  Heart,
  BarChart2,
  AlertCircle,
  CheckCircle,
  Star,
  Zap,
  Send,
  Bell,
  Users,
  Bookmark,
  FileText,
  MoreHorizontal,
  ChevronRight,
  Globe,
  Phone,
  Instagram,
  MessageCircle,
  Smartphone,
} from "lucide-react"

const ChatDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`

const BackButton = styled.button`
  background: ${(props) => props.theme.colors.card};
  border: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.text};
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${(props) => props.theme.radii.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.normal};
  box-shadow: ${(props) => props.theme.shadows.sm};
  
  &:hover {
    background: ${(props) => props.theme.colors.cardHover};
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.md};
  }
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  font-family: ${(props) => props.theme.fonts.heading};
`

const PlatformIndicator = styled.div<{ $bgColor: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: ${(props) => props.theme.radii.full};
  background: ${(props) => props.$bgColor}20;
  color: ${(props) => props.$bgColor};
  font-weight: 600;
  font-size: 0.875rem;
  margin-left: 1rem;
`

const ChatInfoCard = styled.div`
  background: ${(props) => props.theme.colors.card};
  border-radius: ${(props) => props.theme.radii.xl};
  padding: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.card};
  
  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }
`

const ChatInfoSection = styled.div`
  flex: 1;
  min-width: 200px;
`

const ChatInfoTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  font-family: ${(props) => props.theme.fonts.heading};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: ${(props) => props.theme.colors.primary};
  }
`

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const InfoIcon = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: ${(props) => props.theme.radii.md};
  background: ${(props) => props.theme.colors.primaryLight};
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
`

const InfoLabel = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.textMuted};
`

const InfoValue = styled.div`
  font-weight: 500;
`

const TagsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`

const Tag = styled.span<{ $color: string }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: ${(props) => props.theme.radii.full};
  background: ${(props) => props.$color}20;
  color: ${(props) => props.$color};
  font-weight: 500;
  display: inline-flex;
  align-items: center;
`

const ActionButton = styled(motion.button)`
  padding: 0.75rem 1.25rem;
  border-radius: ${(props) => props.theme.radii.lg};
  background: ${(props) => props.theme.colors.primaryGradient};
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: ${(props) => props.theme.shadows.md};
  transition: all ${(props) => props.theme.transitions.normal};
  
  &:hover {
    box-shadow: ${(props) => props.theme.shadows.lg};
    transform: translateY(-2px);
  }
`

const SecondaryButton = styled(motion.button)`
  padding: 0.75rem 1.25rem;
  border-radius: ${(props) => props.theme.radii.lg};
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  font-weight: 600;
  font-size: 0.875rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: ${(props) => props.theme.shadows.sm};
  transition: all ${(props) => props.theme.transitions.normal};
  
  &:hover {
    box-shadow: ${(props) => props.theme.shadows.md};
    background: ${(props) => props.theme.colors.cardHover};
    transform: translateY(-2px);
  }
`

const ChatMessagesCard = styled.div`
  background: ${(props) => props.theme.colors.card};
  border-radius: ${(props) => props.theme.radii.xl};
  padding: 1.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.card};
`

const ChatMessagesTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  font-family: ${(props) => props.theme.fonts.heading};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: ${(props) => props.theme.colors.primary};
  }
`

const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const MessageGroup = styled.div<{ $isUser: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.$isUser ? "row-reverse" : "row")};
  gap: 1rem;
  max-width: 80%;
  align-self: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
  
  @media (max-width: 640px) {
    max-width: 100%;
  }
`

const MessageAvatar = styled.div<{ $isUser: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: ${(props) => (props.$isUser ? props.theme.colors.primaryGradient : "linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)")};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: ${(props) => props.theme.shadows.md};
`

const MessageContent = styled.div<{ $isUser: boolean }>`
  background: ${(props) => (props.$isUser ? props.theme.colors.primaryGradient : props.theme.colors.background)};
  color: ${(props) => (props.$isUser ? "white" : props.theme.colors.text)};
  padding: 1rem 1.25rem;
  border-radius: ${(props) => props.theme.radii.lg};
  border-top-left-radius: ${(props) => (props.$isUser ? props.theme.radii.lg : "0")};
  border-top-right-radius: ${(props) => (!props.$isUser ? props.theme.radii.lg : "0")};
  box-shadow: ${(props) => props.theme.shadows.md};
  position: relative;
  
  p {
    margin: 0;
    line-height: 1.5;
  }
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    ${(props) => (props.$isUser ? "right: -8px" : "left: -8px")};
    width: 0;
    height: 0;
    border-top: 8px solid ${(props) => (props.$isUser ? props.theme.colors.primary : props.theme.colors.background)};
    border-left: ${(props) => (props.$isUser ? "8px solid transparent" : "0")};
    border-right: ${(props) => (!props.$isUser ? "8px solid transparent" : "0")};
  }
`

const MessageTime = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.textMuted};
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

// New components for sales actions
const ActionsCard = styled.div`
  background: ${(props) => props.theme.colors.card};
  border-radius: ${(props) => props.theme.radii.xl};
  padding: 1.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.card};
`

const ActionsTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  font-family: ${(props) => props.theme.fonts.heading};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: ${(props) => props.theme.colors.primary};
  }
`

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const ActionCard = styled(motion.button)`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.radii.lg};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.normal};
  box-shadow: ${(props) => props.theme.shadows.sm};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.md};
    border-color: ${(props) => props.theme.colors.primary};
  }
`

const ActionIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: ${(props) => props.theme.radii.lg};
  background: ${(props) => props.theme.colors.primaryLight};
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`

const ActionLabel = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  text-align: center;
`

const ActionDescription = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.textMuted};
  text-align: center;
`

const MoreActionsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: ${(props) => props.theme.radii.lg};
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  font-weight: 500;
  font-size: 0.875rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  cursor: pointer;
  width: 100%;
  transition: all ${(props) => props.theme.transitions.normal};
  box-shadow: ${(props) => props.theme.shadows.sm};
  
  &:hover {
    background: ${(props) => props.theme.colors.cardHover};
  }
`

const InsightsCard = styled.div`
  background: ${(props) => props.theme.colors.card};
  border-radius: ${(props) => props.theme.radii.xl};
  padding: 1.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.card};
`

const InsightsTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  font-family: ${(props) => props.theme.fonts.heading};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: ${(props) => props.theme.colors.primary};
  }
`

const InsightsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const InsightItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: ${(props) => props.theme.radii.lg};
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
`

const InsightIcon = styled.div<{ $color: string }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${(props) => props.theme.radii.md};
  background: ${(props) => props.$color}20;
  color: ${(props) => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const InsightContent = styled.div`
  flex: 1;
`

const InsightTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`

const InsightDescription = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textMuted};
`

const InsightAction = styled.button`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
  background: none;
  border: none;
  padding: 0;
  margin-top: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  &:hover {
    text-decoration: underline;
  }
`

const FollowUpForm = styled.div<{ $isVisible: boolean }>`
  display: ${(props) => (props.$isVisible ? "block" : "none")};
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-radius: ${(props) => props.theme.radii.lg};
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
`

const FormTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  font-family: ${(props) => props.theme.fonts.heading};
`

const FormGroup = styled.div`
  margin-bottom: 1rem;
`

const FormLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: ${(props) => props.theme.radii.md};
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.inputBackground};
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: ${(props) => props.theme.shadows.highlight};
  }
`

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: ${(props) => props.theme.radii.md};
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.inputBackground};
  font-size: 0.875rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: ${(props) => props.theme.shadows.highlight};
  }
`

const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`

const DiscountForm = styled.div<{ $isVisible: boolean }>`
  display: ${(props) => (props.$isVisible ? "block" : "none")};
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-radius: ${(props) => props.theme.radii.lg};
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
`

const DiscountPreview = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: ${(props) => props.theme.radii.md};
  background: ${(props) => props.theme.colors.primaryLight};
  border: 1px dashed ${(props) => props.theme.colors.primary};
  text-align: center;
`

const DiscountCode = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  font-family: monospace;
  margin: 0.5rem 0;
  color: ${(props) => props.theme.colors.primary};
`

const CustomerValueBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: ${(props) => props.theme.radii.full};
  background: #f59e0b20;
  color: #f59e0b;
  font-weight: 600;
  font-size: 0.75rem;
  margin-left: 1rem;
`

// Platform colors
const platformColors = {
  website: "#4f46e5", // Indigo
  whatsapp: "#25D366", // WhatsApp green
  instagram: "#E1306C", // Instagram pink
  messenger: "#0084FF", // Messenger blue
  sms: "#6B7280", // Gray
}

// Function to get platform icon
const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "website":
      return <Globe size={16} />
    case "whatsapp":
      return <Phone size={16} />
    case "instagram":
      return <Instagram size={16} />
    case "messenger":
      return <MessageCircle size={16} />
    case "sms":
      return <Smartphone size={16} />
    default:
      return <Globe size={16} />
  }
}

// Tag colors
const tagColors = {
  "product-inquiry": "#4f46e5", // Indigo
  "order-status": "#0ea5e9", // Sky blue
  "return-policy": "#f59e0b", // Amber
  "discount-code": "#10b981", // Emerald
  "product-recommendation": "#8b5cf6", // Violet
  "shipping-info": "#ef4444", // Red
  "payment-issue": "#f43f5e", // Rose
  "account-help": "#6366f1", // Indigo
  "general-question": "#64748b", // Slate
  feedback: "#0d9488", // Teal
}

// Tag display names
const tagNames: Record<string, string> = {
  "product-inquiry": "Product Inquiry",
  "order-status": "Order Status",
  "return-policy": "Return Policy",
  "discount-code": "Discount Code",
  "product-recommendation": "Recommendation",
  "shipping-info": "Shipping",
  "payment-issue": "Payment",
  "account-help": "Account Help",
  "general-question": "General",
  feedback: "Feedback",
}

// Sample conversation data
const conversationsData = [
  {
    id: 1,
    title: "Product Inquiry",
    customer: "John Smith",
    email: "john.smith@example.com",
    date: "Today, 2:30 PM",
    duration: "5 minutes",
    tags: ["product-inquiry", "general-question"],
    customerValue: "Medium",
    purchaseHistory: 2,
    totalSpent: "$120.00",
    platform: "website",
    messages: [
      {
        id: 1,
        role: "user",
        content: "Hi, do you have the blue striped shirt in size medium?",
        timestamp: "2:30 PM",
      },
      {
        id: 2,
        role: "assistant",
        content:
          "Hello! Let me check our inventory for you. Yes, we do have the blue striped shirt in size medium. Would you like me to add it to your cart?",
        timestamp: "2:31 PM",
      },
      {
        id: 3,
        role: "user",
        content:
          "Great! Before I add it to my cart, does it run true to size? I'm sometimes between a medium and large.",
        timestamp: "2:33 PM",
      },
      {
        id: 4,
        role: "assistant",
        content:
          "That's a good question! Our blue striped shirts tend to run slightly slim in the fit. If you're between sizes, I would recommend going with the large for a more comfortable fit. Would you like me to check if we have it in large as well?",
        timestamp: "2:34 PM",
      },
      {
        id: 5,
        role: "user",
        content: "Yes, please check if you have it in large too.",
        timestamp: "2:35 PM",
      },
      {
        id: 6,
        role: "assistant",
        content:
          "I've checked our inventory and I'm happy to confirm that we do have the blue striped shirt available in size large as well. Would you like to proceed with the large size instead?",
        timestamp: "2:35 PM",
      },
    ],
    productInterests: ["Blue Striped Shirt", "Men's Clothing"],
    buyingSignals: "High",
    sentimentScore: "Positive",
  },
  {
    id: 2,
    title: "Order Status",
    customer: "Emma Johnson",
    email: "emma.j@example.com",
    date: "Yesterday, 4:15 PM",
    duration: "3 minutes",
    tags: ["order-status", "shipping-info"],
    customerValue: "High",
    purchaseHistory: 5,
    totalSpent: "$350.00",
    platform: "whatsapp",
    messages: [
      {
        id: 1,
        role: "user",
        content: "Hi, I placed order #12345 two days ago. When will it be shipped?",
        timestamp: "4:15 PM",
      },
      {
        id: 2,
        role: "assistant",
        content:
          "Hello Emma! Let me check the status of your order #12345 for you. I can see that your order has been processed and is currently being packed. It should be shipped within the next 24 hours, and you'll receive a shipping confirmation email with tracking information once it's on its way.",
        timestamp: "4:16 PM",
      },
      {
        id: 3,
        role: "user",
        content: "Thank you! Do you know which shipping carrier will be used?",
        timestamp: "4:17 PM",
      },
      {
        id: 4,
        role: "assistant",
        content:
          "You're welcome! Your order will be shipped via FedEx, and the estimated delivery time is 2-3 business days once shipped. Is there anything else I can help you with regarding your order?",
        timestamp: "4:18 PM",
      },
    ],
    productInterests: ["Women's Accessories", "Seasonal Collection"],
    buyingSignals: "Medium",
    sentimentScore: "Neutral",
  },
]

// Add beautiful loading and not found states
// First, add these new styled components after the existing styled components:

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: ${(props) => props.theme.colors.card};
  border-radius: ${(props) => props.theme.radii.xl};
  text-align: center;
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.card};
  min-height: 300px;
`

const LoadingSpinner = styled(motion.div)`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 3px solid ${(props) => props.theme.colors.border};
  border-top-color: ${(props) => props.theme.colors.primary};
  margin-bottom: 2rem;
`

const LoadingText = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-family: ${(props) => props.theme.fonts.heading};
  color: ${(props) => props.theme.colors.primary};
`

const LoadingSubtext = styled.p`
  color: ${(props) => props.theme.colors.textMuted};
  max-width: 400px;
  margin: 0 auto;
`

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: ${(props) => props.theme.colors.card};
  border-radius: ${(props) => props.theme.radii.xl};
  text-align: center;
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.card};
  min-height: 300px;
`

const NotFoundIcon = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.primaryLight};
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  box-shadow: ${(props) => props.theme.shadows.md};
`

const NotFoundTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: ${(props) => props.theme.fonts.heading};
`

const NotFoundText = styled.p`
  color: ${(props) => props.theme.colors.textMuted};
  max-width: 400px;
  margin: 0 auto 1.5rem;
  line-height: 1.6;
`

const BackToHistoryButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border-radius: ${(props) => props.theme.radii.lg};
  background: ${(props) => props.theme.colors.primaryGradient};
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: ${(props) => props.theme.shadows.md};
  transition: all ${(props) => props.theme.transitions.normal};
  
  &:hover {
    box-shadow: ${(props) => props.theme.shadows.lg};
    transform: translateY(-2px);
  }
`

export default function ChatDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [conversation, setConversation] = useState<(typeof conversationsData)[0] | null>(null)
  const [loading, setLoading] = useState(true)
  const [showFollowUpForm, setShowFollowUpForm] = useState(false)
  const [showDiscountForm, setShowDiscountForm] = useState(false)
  const [discountCode, setDiscountCode] = useState("")
  const [discountAmount, setDiscountAmount] = useState("10")
  const [discountType, setDiscountType] = useState("percentage")
  const [followUpSubject, setFollowUpSubject] = useState("")
  const [followUpMessage, setFollowUpMessage] = useState("")

  useEffect(() => {
    // In a real app, you would fetch the conversation data from an API
    // For demo purposes, we'll use the sample data
    const id = Number(params.id)
    const foundConversation = conversationsData.find((conv) => conv.id === id)

    // Simulate loading
    setTimeout(() => {
      setConversation(foundConversation || null)
      setLoading(false)
    }, 500)
  }, [params.id])

  useEffect(() => {
    if (conversation) {
      // Pre-fill follow-up message
      setFollowUpSubject(`Follow-up on your recent inquiry about ${conversation.title.toLowerCase()}`)
      setFollowUpMessage(
        `Hi ${conversation.customer.split(" ")[0]},\n\nThank you for chatting with us about ${conversation.title.toLowerCase()}. I wanted to follow up and see if you had any other questions or if there's anything else I can help you with.\n\nBest regards,\nThe StoreChatAI Team`,
      )

      // Generate a unique discount code
      const uniqueCode = `${conversation.customer.split(" ")[0].toUpperCase()}${Math.floor(Math.random() * 10000)}OFF`
      setDiscountCode(uniqueCode)
    }
  }, [conversation])

  const handleBack = () => {
    router.back()
  }

  const handleDownload = () => {
    // In a real app, this would generate and download a transcript
    alert("Transcript download functionality would be implemented here")
  }

  const handleSendFollowUp = () => {
    // In a real app, this would send the follow-up email
    alert("Follow-up email would be sent here")
    setShowFollowUpForm(false)
  }

  const handleCreateDiscount = () => {
    // In a real app, this would create the discount code
    alert(`Discount code ${discountCode} created successfully!`)
    setShowDiscountForm(false)
  }

  const handleAddToSegment = () => {
    // In a real app, this would add the customer to a marketing segment
    alert("Customer added to marketing segment")
  }

  const handleCreateOpportunity = () => {
    // In a real app, this would create a sales opportunity
    alert("Sales opportunity created")
  }

  const handleScheduleFollowUp = () => {
    // In a real app, this would schedule a follow-up
    alert("Follow-up scheduled")
  }

  // Now replace the loading state with this:
  if (loading) {
    return (
      <ChatDetailContainer>
        <Header>
          <BackButton onClick={handleBack}>
            <ArrowLeft size={20} />
          </BackButton>
          <Title>Conversation Details</Title>
        </Header>

        <LoadingContainer>
          <LoadingSpinner
            animate={{ rotate: 360 }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1,
              ease: "linear",
            }}
          />
          <LoadingText>Loading conversation...</LoadingText>
          <LoadingSubtext>Please wait while we retrieve the conversation details.</LoadingSubtext>
        </LoadingContainer>
      </ChatDetailContainer>
    )
  }

  // And replace the not found state with this:
  if (!conversation) {
    return (
      <ChatDetailContainer>
        <Header>
          <BackButton onClick={handleBack}>
            <ArrowLeft size={20} />
          </BackButton>
          <Title>Conversation Not Found</Title>
        </Header>

        <NotFoundContainer>
          <NotFoundIcon>
            <FileText size={48} />
          </NotFoundIcon>
          <NotFoundTitle>Conversation Not Found</NotFoundTitle>
          <NotFoundText>
            The conversation you're looking for doesn't exist or has been deleted. Please check the URL or go back to
            the conversation history.
          </NotFoundText>
          <BackToHistoryButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/dashboard/history")}
          >
            <ArrowLeft size={16} />
            Back to History
          </BackToHistoryButton>
        </NotFoundContainer>
      </ChatDetailContainer>
    )
  }

  return (
    <ChatDetailContainer>
      <Header>
        <BackButton onClick={handleBack}>
          <ArrowLeft size={20} />
        </BackButton>
        <Title>{conversation.title}</Title>
        <PlatformIndicator $bgColor={platformColors[conversation.platform as keyof typeof platformColors]}>
          {getPlatformIcon(conversation.platform)}
          {conversation.platform.charAt(0).toUpperCase() + conversation.platform.slice(1)}
        </PlatformIndicator>
      </Header>

      <ChatInfoCard>
        <ChatInfoSection>
          <ChatInfoTitle>
            <User size={18} />
            Customer Information
            <CustomerValueBadge>
              <Star size={12} />
              {conversation.customerValue} Value
            </CustomerValueBadge>
          </ChatInfoTitle>
          <InfoItem>
            <InfoIcon>
              <User size={16} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Name</InfoLabel>
              <InfoValue>{conversation.customer}</InfoValue>
            </InfoContent>
          </InfoItem>
          <InfoItem>
            <InfoIcon>
              <MessageSquare size={16} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>{conversation.email}</InfoValue>
            </InfoContent>
          </InfoItem>
          <InfoItem>
            <InfoIcon>
              <ShoppingCart size={16} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Purchase History</InfoLabel>
              <InfoValue>
                {conversation.purchaseHistory} orders (${conversation.totalSpent})
              </InfoValue>
            </InfoContent>
          </InfoItem>
        </ChatInfoSection>

        <ChatInfoSection>
          <ChatInfoTitle>
            <Calendar size={18} />
            Conversation Details
          </ChatInfoTitle>
          <InfoItem>
            <InfoIcon>
              <Calendar size={16} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Date & Time</InfoLabel>
              <InfoValue>{conversation.date}</InfoValue>
            </InfoContent>
          </InfoItem>
          <InfoItem>
            <InfoIcon>
              <Clock size={16} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Duration</InfoLabel>
              <InfoValue>{conversation.duration}</InfoValue>
            </InfoContent>
          </InfoItem>
          <InfoItem>
            <InfoIcon>
              <Heart size={16} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Sentiment</InfoLabel>
              <InfoValue>{conversation.sentimentScore}</InfoValue>
            </InfoContent>
          </InfoItem>
        </ChatInfoSection>

        <ChatInfoSection>
          <ChatInfoTitle>
            <MessageSquare size={18} />
            Categories
          </ChatInfoTitle>
          <TagsContainer>
            {conversation.tags.map((tag) => (
              <Tag key={tag} $color={tagColors[tag as keyof typeof tagColors] || "#64748b"}>
                {tagNames[tag] || tag}
              </Tag>
            ))}
          </TagsContainer>
          <div style={{ marginTop: "1rem" }}>
            <ActionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleDownload}>
              <Download size={16} />
              Download Transcript
            </ActionButton>
          </div>
        </ChatInfoSection>
      </ChatInfoCard>

      {/* Moved the conversation section to appear first */}
      <ChatMessagesCard>
        <ChatMessagesTitle>
          <MessageSquare size={18} />
          Conversation
        </ChatMessagesTitle>
        <ChatMessages>
          {conversation.messages.map((message) => (
            <MessageGroup key={message.id} $isUser={message.role === "user"}>
              <MessageAvatar $isUser={message.role === "user"}>
                {message.role === "user" ? <User size={16} /> : <Bot size={16} />}
              </MessageAvatar>
              <div>
                <MessageContent $isUser={message.role === "user"}>
                  <p>{message.content}</p>
                </MessageContent>
                <MessageTime>
                  <Clock size={12} />
                  {message.timestamp}
                </MessageTime>
              </div>
            </MessageGroup>
          ))}
        </ChatMessages>
      </ChatMessagesCard>

      <ActionsCard>
        <ActionsTitle>
          <Zap size={18} />
          Sales Actions
        </ActionsTitle>
        <ActionsGrid>
          <ActionCard
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFollowUpForm(!showFollowUpForm)}
          >
            <ActionIcon>
              <Mail size={20} />
            </ActionIcon>
            <ActionLabel>Send Follow-up</ActionLabel>
            <ActionDescription>Email the customer</ActionDescription>
          </ActionCard>

          <ActionCard
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDiscountForm(!showDiscountForm)}
          >
            <ActionIcon>
              <LucideTag size={20} />
            </ActionIcon>
            <ActionLabel>Create Discount</ActionLabel>
            <ActionDescription>Personalized offer</ActionDescription>
          </ActionCard>

          <ActionCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleAddToSegment}>
            <ActionIcon>
              <Users size={20} />
            </ActionIcon>
            <ActionLabel>Add to Segment</ActionLabel>
            <ActionDescription>For targeted marketing</ActionDescription>
          </ActionCard>

          <ActionCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleCreateOpportunity}>
            <ActionIcon>
              <DollarSign size={20} />
            </ActionIcon>
            <ActionLabel>Create Opportunity</ActionLabel>
            <ActionDescription>Track potential sale</ActionDescription>
          </ActionCard>
        </ActionsGrid>

        <MoreActionsButton>
          <MoreHorizontal size={16} />
          More Actions
        </MoreActionsButton>

        <FollowUpForm $isVisible={showFollowUpForm}>
          <FormTitle>Send Follow-up Email</FormTitle>
          <FormGroup>
            <FormLabel>To</FormLabel>
            <FormInput type="email" value={conversation.email} readOnly />
          </FormGroup>
          <FormGroup>
            <FormLabel>Subject</FormLabel>
            <FormInput type="text" value={followUpSubject} onChange={(e) => setFollowUpSubject(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <FormLabel>Message</FormLabel>
            <FormTextarea value={followUpMessage} onChange={(e) => setFollowUpMessage(e.target.value)} />
          </FormGroup>
          <FormActions>
            <SecondaryButton whileTap={{ scale: 0.95 }} onClick={() => setShowFollowUpForm(false)}>
              Cancel
            </SecondaryButton>
            <ActionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSendFollowUp}>
              <Send size={16} />
              Send Email
            </ActionButton>
          </FormActions>
        </FollowUpForm>

        <DiscountForm $isVisible={showDiscountForm}>
          <FormTitle>Create Personalized Discount</FormTitle>
          <FormGroup>
            <FormLabel>Discount Code</FormLabel>
            <FormInput type="text" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <FormLabel>Discount Type</FormLabel>
            <FormInput as="select" value={discountType} onChange={(e) => setDiscountType(e.target.value)}>
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
              <option value="free_shipping">Free Shipping</option>
            </FormInput>
          </FormGroup>
          <FormGroup>
            <FormLabel>Discount Amount</FormLabel>
            <FormInput type="text" value={discountAmount} onChange={(e) => setDiscountAmount(e.target.value)} />
          </FormGroup>
          <DiscountPreview>
            <div>Preview</div>
            <DiscountCode>{discountCode}</DiscountCode>
            <div>
              {discountType === "percentage"
                ? `${discountAmount}% off`
                : discountType === "fixed"
                  ? `$${discountAmount} off`
                  : "Free shipping"}
            </div>
          </DiscountPreview>
          <FormActions style={{ marginTop: "1rem" }}>
            <SecondaryButton whileTap={{ scale: 0.95 }} onClick={() => setShowDiscountForm(false)}>
              Cancel
            </SecondaryButton>
            <ActionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleCreateDiscount}>
              <LucideTag size={16} />
              Create & Send
            </ActionButton>
          </FormActions>
        </DiscountForm>
      </ActionsCard>

      <InsightsCard>
        <InsightsTitle>
          <BarChart2 size={18} />
          Customer Insights
        </InsightsTitle>
        <InsightsList>
          <InsightItem>
            <InsightIcon $color="#4f46e5">
              <Bookmark size={18} />
            </InsightIcon>
            <InsightContent>
              <InsightTitle>Product Interest</InsightTitle>
              <InsightDescription>
                Customer showed interest in: {conversation.productInterests.join(", ")}
              </InsightDescription>
              <InsightAction>
                View recommended products
                <ChevronRight size={14} />
              </InsightAction>
            </InsightContent>
          </InsightItem>

          <InsightItem>
            <InsightIcon $color="#10b981">
              <AlertCircle size={18} />
            </InsightIcon>
            <InsightContent>
              <InsightTitle>Buying Signals: {conversation.buyingSignals}</InsightTitle>
              <InsightDescription>
                {conversation.buyingSignals === "High"
                  ? "Customer showed strong intent to purchase. Follow up recommended."
                  : "Customer showed moderate interest. Consider nurturing with content."}
              </InsightDescription>
              <InsightAction onClick={handleScheduleFollowUp}>
                Schedule follow-up reminder
                <Bell size={14} />
              </InsightAction>
            </InsightContent>
          </InsightItem>

          <InsightItem>
            <InsightIcon $color="#f59e0b">
              <FileText size={18} />
            </InsightIcon>
            <InsightContent>
              <InsightTitle>AI Recommendations</InsightTitle>
              <InsightDescription>
                Based on this conversation, we recommend:
                <ul style={{ margin: "0.5rem 0 0 1rem", padding: 0 }}>
                  <li>Send a personalized product recommendation</li>
                  <li>Add customer to "{conversation.productInterests[0]}" email segment</li>
                  <li>Offer a limited-time discount to encourage purchase</li>
                </ul>
              </InsightDescription>
              <InsightAction>
                Apply all recommendations
                <CheckCircle size={14} />
              </InsightAction>
            </InsightContent>
          </InsightItem>
        </InsightsList>
      </InsightsCard>
    </ChatDetailContainer>
  )
}

