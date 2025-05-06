"use client"

import { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { Send, Bot, User, Sparkles } from "lucide-react"
import { useChat } from "ai/react"

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 10rem);
  background: ${(props) => props.theme.colors.card};
  border-radius: ${(props) => props.theme.radii.xl};
  box-shadow: ${(props) => props.theme.shadows.card};
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.border};
`

const ChatHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${(props) => props.theme.colors.background};
`

const ChatTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  font-family: ${(props) => props.theme.fonts.heading};
`

const ChatStatus = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.success};
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  &::before {
    content: "";
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.success};
  }
`

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: ${(props) => props.theme.colors.background};
  
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

const MessageGroup = styled.div<{ $isUser: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.$isUser ? "row-reverse" : "row")};
  gap: 1rem;
  max-width: 80%;
  align-self: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
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
  background: ${(props) => (props.$isUser ? props.theme.colors.primaryGradient : props.theme.colors.card)};
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
    border-top: 8px solid ${(props) => (props.$isUser ? props.theme.colors.primary : props.theme.colors.card)};
    border-left: ${(props) => (props.$isUser ? "8px solid transparent" : "0")};
    border-right: ${(props) => (!props.$isUser ? "8px solid transparent" : "0")};
  }
`

const ChatInputContainer = styled.div`
  padding: 1.25rem 1.5rem;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.card};
`

const ChatInputForm = styled.form`
  display: flex;
  gap: 0.75rem;
  position: relative;
`

const ChatInput = styled.input`
  flex: 1;
  padding: 0.875rem 1rem;
  border-radius: ${(props) => props.theme.radii.full};
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.inputBackground};
  color: ${(props) => props.theme.colors.text};
  font-size: 1rem;
  box-shadow: ${(props) => props.theme.shadows.sm};
  transition: all ${(props) => props.theme.transitions.normal};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: ${(props) => props.theme.shadows.highlight};
  }
`

const SendButton = styled(motion.button)`
  background: ${(props) => props.theme.colors.primaryGradient};
  color: white;
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${(props) => props.theme.shadows.md};
  transition: all ${(props) => props.theme.transitions.normal};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    box-shadow: none;
  }
  
  &:hover:not(:disabled) {
    box-shadow: ${(props) => props.theme.shadows.lg};
    transform: translateY(-2px);
  }
`

const WelcomeMessage = styled(motion.div)`
  text-align: center;
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  p {
    color: ${(props) => props.theme.colors.textMuted};
    max-width: 500px;
    margin: 0 auto;
  }
`

export default function ChatbotPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (!mounted) return null

  return (
    <ChatContainer>
      <ChatHeader>
        <Bot size={20} color="#6c5ce7" />
        <ChatTitle>AI Chatbot</ChatTitle>
        <ChatStatus>Online</ChatStatus>
      </ChatHeader>

      <ChatMessages>
        {/* Welcome message */}
        {messages.length === 0 && (
          <>
            <WelcomeMessage
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3>
                <Sparkles size={20} />
                Welcome to StoreChatAI
              </h3>
              <p>
                Your AI-powered shopping assistant is ready to help your customers find products, answer questions, and
                provide support.
              </p>
            </WelcomeMessage>

            <MessageGroup $isUser={false}>
              <MessageAvatar $isUser={false}>
                <Bot size={16} />
              </MessageAvatar>
              <MessageContent $isUser={false}>
                <p>Hello! I'm your AI assistant for your Shopify store. How can I help you today?</p>
              </MessageContent>
            </MessageGroup>
          </>
        )}

        {messages.map((message) => (
          <MessageGroup key={message.id} $isUser={message.role === "user"}>
            <MessageAvatar $isUser={message.role === "user"}>
              {message.role === "user" ? <User size={16} /> : <Bot size={16} />}
            </MessageAvatar>
            <MessageContent $isUser={message.role === "user"}>
              <p>{message.content}</p>
            </MessageContent>
          </MessageGroup>
        ))}

        <div ref={messagesEndRef} />
      </ChatMessages>

      <ChatInputContainer>
        <ChatInputForm onSubmit={handleSubmit}>
          <ChatInput
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <SendButton
            type="submit"
            disabled={isLoading || !input.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send size={18} />
          </SendButton>
        </ChatInputForm>
      </ChatInputContainer>
    </ChatContainer>
  )
}

