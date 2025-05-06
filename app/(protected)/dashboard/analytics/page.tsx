"use client"

import { useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Calendar, ChevronDown, Users, MessageSquare, ShoppingBag, Clock, ArrowUpRight } from "lucide-react"

const AnalyticsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 0.5rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
`

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  font-family: ${(props) => props.theme.fonts.heading};
  letter-spacing: -0.02em;
  background: ${(props) => props.theme.colors.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const DateSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: ${(props) => props.theme.radii.lg};
  background: ${(props) => props.theme.colors.card};
  border: 1px solid ${(props) => props.theme.colors.border};
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: ${(props) => props.theme.shadows.sm};
  transition: all ${(props) => props.theme.transitions.normal};
  
  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: ${(props) => props.theme.shadows.md};
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
`

const StatCard = styled(motion.div)`
  background: ${(props) => props.theme.colors.card};
  border-radius: ${(props) => props.theme.radii.xl};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: ${(props) => props.theme.shadows.card};
  border: 1px solid ${(props) => props.theme.colors.border};
  transition: all ${(props) => props.theme.transitions.normal};
  
  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: ${(props) => props.theme.shadows.lg};
    transform: translateY(-4px);
  }
`

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StatTitle = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textMuted};
  font-weight: 500;
`

const StatIcon = styled.div<{ color: string }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${(props) => props.theme.radii.lg};
  background: ${(props) => `${props.color}20`};
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${(props) => props.theme.shadows.sm};
`

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  font-family: ${(props) => props.theme.fonts.heading};
  letter-spacing: -0.02em;
`

const StatChange = styled.div<{ $positive: boolean }>`
  font-size: 0.875rem;
  color: ${(props) => (props.$positive ? props.theme.colors.success : props.theme.colors.error)};
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 500;
  
  svg {
    transform: ${(props) => (props.$positive ? "rotate(0deg)" : "rotate(180deg)")};
  }
`

const ChartCard = styled.div`
  background: ${(props) => props.theme.colors.card};
  border-radius: ${(props) => props.theme.radii.xl};
  padding: 1.5rem;
  height: 400px;
  box-shadow: ${(props) => props.theme.shadows.card};
  border: 1px solid ${(props) => props.theme.colors.border};
  transition: all ${(props) => props.theme.transitions.normal};
  
  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: ${(props) => props.theme.shadows.lg};
  }
`

const ChartHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

const ChartTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  font-family: ${(props) => props.theme.fonts.heading};
`

const ChartLegend = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
`

const LegendColor = styled.div<{ color: string }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: ${(props) => props.color};
`

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`

// Enhanced colors for charts
const COLORS = ["#4f46e5", "#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe"]

// Sample data
const dailyData = [
  { name: "Mon", conversations: 12, orders: 5 },
  { name: "Tue", conversations: 19, orders: 8 },
  { name: "Wed", conversations: 15, orders: 6 },
  { name: "Thu", conversations: 22, orders: 10 },
  { name: "Fri", conversations: 28, orders: 12 },
  { name: "Sat", conversations: 20, orders: 9 },
  { name: "Sun", conversations: 16, orders: 7 },
]

const topicData = [
  { name: "Product Info", value: 35 },
  { name: "Order Status", value: 25 },
  { name: "Returns", value: 15 },
  { name: "Shipping", value: 15 },
  { name: "Other", value: 10 },
]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("Last 7 days")

  return (
    <AnalyticsContainer>
      <Header>
        <Title>Analytics Dashboard</Title>
        <DateSelector>
          <Calendar size={16} />
          <span>{dateRange}</span>
          <ChevronDown size={16} />
        </DateSelector>
      </Header>

      <StatsGrid>
        <StatCard whileHover={{ y: -5 }}>
          <StatHeader>
            <StatTitle>Total Conversations</StatTitle>
            <StatIcon color="#4f46e5">
              <MessageSquare size={18} />
            </StatIcon>
          </StatHeader>
          <StatValue>132</StatValue>
          <StatChange $positive={true}>
            <ArrowUpRight size={16} />
            12% from last week
          </StatChange>
        </StatCard>

        <StatCard whileHover={{ y: -5 }}>
          <StatHeader>
            <StatTitle>Unique Customers</StatTitle>
            <StatIcon color="#6366f1">
              <Users size={18} />
            </StatIcon>
          </StatHeader>
          <StatValue>87</StatValue>
          <StatChange $positive={true}>
            <ArrowUpRight size={16} />
            8% from last week
          </StatChange>
        </StatCard>

        <StatCard whileHover={{ y: -5 }}>
          <StatHeader>
            <StatTitle>Assisted Orders</StatTitle>
            <StatIcon color="#818cf8">
              <ShoppingBag size={18} />
            </StatIcon>
          </StatHeader>
          <StatValue>57</StatValue>
          <StatChange $positive={true}>
            <ArrowUpRight size={16} />
            15% from last week
          </StatChange>
        </StatCard>

        <StatCard whileHover={{ y: -5 }}>
          <StatHeader>
            <StatTitle>Avg. Response Time</StatTitle>
            <StatIcon color="#a5b4fc">
              <Clock size={18} />
            </StatIcon>
          </StatHeader>
          <StatValue>1.2s</StatValue>
          <StatChange $positive={true}>
            <ArrowUpRight size={16} />
            0.3s from last week
          </StatChange>
        </StatCard>
      </StatsGrid>

      <TwoColumnGrid>
        <ChartCard>
          <ChartHeader>
            <ChartTitle>Conversations & Orders</ChartTitle>
            <ChartLegend>
              <LegendItem>
                <LegendColor color="#4f46e5" />
                <span>Conversations</span>
              </LegendItem>
              <LegendItem>
                <LegendColor color="#a5b4fc" />
                <span>Orders</span>
              </LegendItem>
            </ChartLegend>
          </ChartHeader>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: "none",
                }}
              />
              <Bar dataKey="conversations" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="orders" fill="#a5b4fc" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard>
          <ChartHeader>
            <ChartTitle>Conversation Topics</ChartTitle>
          </ChartHeader>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={topicData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {topicData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: "none",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </TwoColumnGrid>
    </AnalyticsContainer>
  )
}

