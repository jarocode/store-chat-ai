"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import styled from "styled-components"
import { motion } from "framer-motion"
import {
  MessageSquare,
  Calendar,
  Search,
  ChevronRight,
  Filter,
  ChevronDown,
  Globe,
  Phone,
  Instagram,
  MessageCircle,
  Smartphone,
} from "lucide-react"

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
  display: flex;
  gap: 0.75rem;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`

const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  border-radius: ${(props) => props.theme.radii.lg};
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.inputBackground};
  color: ${(props) => props.theme.colors.text};
  font-size: 0.875rem;
  box-shadow: ${(props) => props.theme.shadows.sm};
  transition: all ${(props) => props.theme.transitions.normal};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: ${(props) => props.theme.shadows.highlight};
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 0.875rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
`

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.25rem;
  border-radius: ${(props) => props.theme.radii.lg};
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.card};
  color: ${(props) => props.theme.colors.text};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.normal};
  box-shadow: ${(props) => props.theme.shadows.sm};
  position: relative;

  &:hover {
    background: ${(props) => props.theme.colors.cardHover};
    border-color: ${(props) => props.theme.colors.primary};
  }
`

const FilterDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 220px;
  background: ${(props) => props.theme.colors.card};
  border-radius: ${(props) => props.theme.radii.lg};
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.lg};
  z-index: 10;
  overflow: hidden;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
`

const FilterSection = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`

const FilterSectionTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.textMuted};
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
`

const FilterOptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const FilterOption = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: ${(props) => props.theme.radii.md};
  background: ${(props) => (props.$active ? props.theme.colors.primaryLight : "transparent")};
  color: ${(props) => (props.$active ? props.theme.colors.primary : props.theme.colors.text)};
  font-size: 0.875rem;
  border: none;
  text-align: left;
  cursor: pointer;
  width: 100%;
  transition: all ${(props) => props.theme.transitions.fast};

  &:hover {
    background: ${(props) => (props.$active ? props.theme.colors.primaryLight : props.theme.colors.sidebarHoverBackground)};
  }
`

const ConversationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const ConversationCard = styled(motion.div)`
  background: ${(props) => props.theme.colors.card};
  border-radius: ${(props) => props.theme.radii.lg};
  padding: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.normal};
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.card};

  &:hover {
    background: ${(props) => props.theme.colors.cardHover};
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.lg};
    border-color: ${(props) => props.theme.colors.primary};
  }

  @media (max-width: 640px) {
    flex-wrap: wrap;
  }
`

const ConversationIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: ${(props) => props.theme.radii.lg};
  background: ${(props) => props.theme.colors.primaryLight};
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: ${(props) => props.theme.shadows.sm};
`

const ConversationContent = styled.div`
  flex: 1;
  min-width: 0;
`

const ConversationTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 1.125rem;
`

const ConversationPreview = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ConversationDate = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.textMuted};
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 500;
  padding: 0.375rem 0.75rem;
  background: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.radii.full};

  @media (max-width: 640px) {
    order: 3;
    width: 100%;
  }
`

const ConversationArrow = styled.div`
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.primaryLight};
  transition: all ${(props) => props.theme.transitions.normal};

  @media (max-width: 640px) {
    display: none;
  }
`

const TagsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
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
  white-space: nowrap;
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: ${(props) => props.theme.colors.card};
  border-radius: ${(props) => props.theme.radii.xl};
  text-align: center;
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.card};
`

const EmptyStateIcon = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.primaryLight};
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: ${(props) => props.theme.shadows.md};
`

const EmptyStateTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  font-family: ${(props) => props.theme.fonts.heading};
`

const EmptyStateText = styled.p`
  color: ${(props) => props.theme.colors.textMuted};
  max-width: 400px;
  margin: 0 auto;
  line-height: 1.6;
`

// Platform indicator
const PlatformIndicator = styled.div<{ $bgColor: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: ${(props) => props.$bgColor};
  color: white;
  box-shadow: ${(props) => props.theme.shadows.sm};
  margin-right: 0.5rem;
`

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

// Platform colors
const platformColors = {
  website: "#4f46e5", // Indigo
  whatsapp: "#25D366", // WhatsApp green
  instagram: "#E1306C", // Instagram pink
  messenger: "#0084FF", // Messenger blue
  sms: "#6B7280", // Gray
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

// Date filter options
const dateFilterOptions = [
  { id: "all", label: "All Time" },
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
]

// Platform filter options
const platformFilterOptions = [
  { id: "all", label: "All Platforms" },
  { id: "website", label: "Website" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "instagram", label: "Instagram" },
  { id: "messenger", label: "Messenger" },
  { id: "sms", label: "SMS" },
]

// Sample conversation data with tags and platforms
const conversations = [
  {
    id: 1,
    title: "Product Inquiry",
    preview: "Do you have this shirt in size medium?",
    date: "2 hours ago",
    tags: ["product-inquiry", "general-question"],
    platform: "website",
  },
  {
    id: 2,
    title: "Order Status",
    preview: "When will my order #12345 be shipped?",
    date: "Yesterday",
    tags: ["order-status", "shipping-info"],
    platform: "whatsapp",
  },
  {
    id: 3,
    title: "Return Policy",
    preview: "What is your return policy for damaged items?",
    date: "3 days ago",
    tags: ["return-policy"],
    platform: "instagram",
  },
  {
    id: 4,
    title: "Discount Code",
    preview: "Is there a discount code for first-time customers?",
    date: "Last week",
    tags: ["discount-code", "general-question"],
    platform: "messenger",
  },
  {
    id: 5,
    title: "Product Recommendation",
    preview: "Can you recommend a gift for my wife?",
    date: "2 weeks ago",
    tags: ["product-recommendation", "general-question"],
    platform: "sms",
  },
]

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

export default function HistoryPage() {
  const router = useRouter()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [activeTagFilter, setActiveTagFilter] = useState<string | null>(null)
  const [activePlatformFilter, setActivePlatformFilter] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleConversationClick = (id: number) => {
    router.push(`/dashboard/history/${id}`)
  }

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  const handleDateFilterChange = (filterId: string) => {
    setActiveFilter(filterId)
    setIsFilterOpen(false)
  }

  const handleTagFilterChange = (tagId: string) => {
    setActiveTagFilter(tagId === activeTagFilter ? null : tagId)
    setIsFilterOpen(false)
  }

  const handlePlatformFilterChange = (platformId: string) => {
    setActivePlatformFilter(platformId === activePlatformFilter ? null : platformId)
    setIsFilterOpen(false)
  }

  // Get all unique tags from conversations
  const allTags = Array.from(new Set(conversations.flatMap((conversation) => conversation.tags))).sort()

  // Filter conversations based on active filters and search query
  const filteredConversations = conversations.filter((conversation) => {
    // Filter by search query
    if (
      searchQuery &&
      !conversation.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !conversation.preview.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by tag
    if (activeTagFilter && !conversation.tags.includes(activeTagFilter)) {
      return false
    }

    // Filter by platform
    if (activePlatformFilter && activePlatformFilter !== "all" && conversation.platform !== activePlatformFilter) {
      return false
    }

    // Date filtering would be implemented here in a real app
    // For demo purposes, we'll just return true for all dates except "today"
    if (activeFilter === "today" && conversation.date !== "2 hours ago") {
      return false
    }

    return true
  })

  return (
    <HistoryContainer>
      <SearchContainer>
        <SearchInputWrapper>
          <SearchIcon>
            <Search size={18} />
          </SearchIcon>
          <SearchInput
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchInputWrapper>

        <FilterButton onClick={toggleFilter}>
          <Filter size={16} />
          Filter
          <ChevronDown size={16} style={{ marginLeft: "4px" }} />
        </FilterButton>

        <FilterDropdown $isOpen={isFilterOpen}>
          <FilterSection>
            <FilterSectionTitle>Date</FilterSectionTitle>
            <FilterOptionsList>
              {dateFilterOptions.map((option) => (
                <FilterOption
                  key={option.id}
                  $active={activeFilter === option.id}
                  onClick={() => handleDateFilterChange(option.id)}
                >
                  {option.label}
                </FilterOption>
              ))}
            </FilterOptionsList>
          </FilterSection>

          <FilterSection>
            <FilterSectionTitle>Platform</FilterSectionTitle>
            <FilterOptionsList>
              {platformFilterOptions.map((option) => (
                <FilterOption
                  key={option.id}
                  $active={activePlatformFilter === option.id}
                  onClick={() => handlePlatformFilterChange(option.id)}
                >
                  {getPlatformIcon(option.id)}
                  {option.label}
                </FilterOption>
              ))}
            </FilterOptionsList>
          </FilterSection>

          <FilterSection>
            <FilterSectionTitle>Tags</FilterSectionTitle>
            <FilterOptionsList>
              {allTags.map((tag) => (
                <FilterOption key={tag} $active={activeTagFilter === tag} onClick={() => handleTagFilterChange(tag)}>
                  <Tag $color={tagColors[tag as keyof typeof tagColors] || "#64748b"} style={{ marginRight: "4px" }}>
                    {tagNames[tag] || tag}
                  </Tag>
                </FilterOption>
              ))}
            </FilterOptionsList>
          </FilterSection>
        </FilterDropdown>
      </SearchContainer>

      {filteredConversations.length > 0 ? (
        <ConversationList>
          {filteredConversations.map((conversation) => (
            <ConversationCard
              key={conversation.id}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleConversationClick(conversation.id)}
              style={{ position: "relative" }}
            >
              <ConversationIcon>
                <MessageSquare size={20} />
              </ConversationIcon>
              <ConversationContent>
                <ConversationTitle>{conversation.title}</ConversationTitle>
                <ConversationPreview>{conversation.preview}</ConversationPreview>
                <TagsContainer>
                  <PlatformIndicator $bgColor={platformColors[conversation.platform as keyof typeof platformColors]}>
                    {getPlatformIcon(conversation.platform)}
                  </PlatformIndicator>
                  {conversation.tags.map((tag) => (
                    <Tag key={tag} $color={tagColors[tag as keyof typeof tagColors] || "#64748b"}>
                      {tagNames[tag] || tag}
                    </Tag>
                  ))}
                </TagsContainer>
              </ConversationContent>
              <ConversationDate>
                <Calendar size={14} />
                {conversation.date}
              </ConversationDate>
              <ConversationArrow>
                <ChevronRight size={18} />
              </ConversationArrow>

              {/* Platform indicator */}
              {/*<PlatformIndicator $bgColor={platformColors[conversation.platform as keyof typeof platformColors]}>
                {getPlatformIcon(conversation.platform)}
              </PlatformIndicator>*/}
            </ConversationCard>
          ))}
        </ConversationList>
      ) : (
        <EmptyState>
          <EmptyStateIcon>
            <MessageSquare size={24} />
          </EmptyStateIcon>
          <EmptyStateTitle>No conversations found</EmptyStateTitle>
          <EmptyStateText>
            {searchQuery || activeTagFilter || activePlatformFilter || activeFilter !== "all"
              ? "Try adjusting your filters or search query to find conversations."
              : "When customers interact with your AI chatbot, their conversations will appear here."}
          </EmptyStateText>
        </EmptyState>
      )}
    </HistoryContainer>
  )
}

