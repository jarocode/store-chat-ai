"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import {
  Copy,
  Check,
  RefreshCw,
  Send,
  Bot,
  Sparkles,
  Code,
  MessageCircle,
  Instagram,
  Phone,
  Smartphone,
  Link2,
  ArrowRight,
  MessageSquare,
} from "lucide-react"

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const SettingsSection = styled.section`
  background: ${(props) => props.theme.colors.card};
  border-radius: ${(props) => props.theme.radii.xl};
  padding: 1.5rem;
  box-shadow: ${(props) => props.theme.shadows.card};
  border: 1px solid ${(props) => props.theme.colors.border};
  transition: all ${(props) => props.theme.transitions.normal};

  &:hover {
    box-shadow: ${(props) => props.theme.shadows.lg};
  }

  @media (min-width: 640px) {
    padding: 2rem;
  }
`

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  font-family: ${(props) => props.theme.fonts.heading};
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${(props) => props.theme.colors.primary};
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
`

const Input = styled.input`
  padding: 0.875rem 1rem;
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

  @media (min-width: 640px) {
    font-size: 1rem;
  }
`

const ColorPicker = styled.input`
  width: 100%;
  height: 40px;
  padding: 0;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.radii.lg};
  background: ${(props) => props.theme.colors.inputBackground};
  cursor: pointer;
  box-shadow: ${(props) => props.theme.shadows.sm};

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: ${(props) => props.theme.radii.lg};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: ${(props) => props.theme.shadows.highlight};
  }
`

const Select = styled.select`
  padding: 0.875rem 1rem;
  border-radius: ${(props) => props.theme.radii.lg};
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.inputBackground};
  color: ${(props) => props.theme.colors.text};
  font-size: 0.875rem;
  box-shadow: ${(props) => props.theme.shadows.sm};
  transition: all ${(props) => props.theme.transitions.normal};
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236b7280' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;
  padding-right: 2.5rem;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: ${(props) => props.theme.shadows.highlight};
  }

  @media (min-width: 640px) {
    font-size: 1rem;
  }
`

const Button = styled(motion.button)`
  padding: 0.875rem 1.5rem;
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

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (min-width: 640px) {
    font-size: 1rem;
  }
`

const PreviewContainer = styled.div`
  margin-top: 2rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.radii.lg};
  padding: 1.5rem;
  background: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.shadows.sm};

  @media (min-width: 640px) {
    margin-top: 2.5rem;
    padding: 2rem;
  }
`

// Update the ChatWidgetPreview styled component to include fontColor
const ChatWidgetPreview = styled.div<{ primaryColor: string; fontSize: string; fontColor: string; position: string }>`
  position: relative;
  width: 100%;
  max-width: 320px;
  height: 400px;
  border-radius: ${(props) => props.theme.radii.xl};
  overflow: hidden;
  box-shadow: ${(props) => props.theme.shadows.elevated};
  margin: 0 auto;
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.background};

  @media (max-width: 480px) {
    max-width: 100%;
    height: 350px;
  }

  .widget-header {
    background: ${(props) => props.primaryColor};
    color: ${(props) => props.fontColor};
    padding: 1rem 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .widget-logo {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    object-fit: contain;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .widget-title {
    font-weight: 600;
    font-size: ${(props) => props.fontSize};
    letter-spacing: -0.01em;
  }

  .widget-body {
    background: white;
    height: calc(100% - 64px);
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(79, 70, 229, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(79, 70, 229, 0.03) 0%, transparent 50%);
  }

  .widget-message {
    background: #f5f7fa;
    padding: 1rem 1.25rem;
    border-radius: 1rem;
    border-bottom-left-radius: 0;
    margin-bottom: 1.25rem;
    max-width: 85%;
    font-size: ${(props) => props.fontSize};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    line-height: 1.5;
    position: relative;
    
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: -8px;
      width: 0;
      height: 0;
      border-right: 8px solid #f5f7fa;
      border-top: 8px solid transparent;
      border-bottom: 8px solid #f5f7fa;
    }
  }

  .widget-input {
    display: flex;
    gap: 0.75rem;
    border-top: 1px solid #f1f5f9;
    padding-top: 1rem;
    margin-top: auto;
  }

  .widget-input-field {
    flex: 1;
    padding: 0.75rem 1rem;
    border-radius: 1.5rem;
    border: 1px solid #e2e8f0;
    font-size: ${(props) => props.fontSize};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: ${(props) => props.primaryColor};
      box-shadow: 0 0 0 3px ${(props) => props.primaryColor}20;
    }
  }

  .widget-send-button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: ${(props) => props.primaryColor};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }
  
  .widget-toggle {
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: ${(props) => props.primaryColor};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: ${(props) => props.theme.shadows.lg};
    cursor: pointer;
    z-index: 10;
    
    ${(props) => {
      switch (props.position) {
        case "bottom-right":
          return `
            bottom: 20px;
            right: 20px;
          `
        case "bottom-left":
          return `
            bottom: 20px;
            left: 20px;
          `
        case "top-right":
          return `
            top: 20px;
            right: 20px;
          `
        case "top-left":
          return `
            top: 20px;
            left: 20px;
          `
        default:
          return `
            bottom: 20px;
            right: 20px;
          `
      }
    }}
  }
`

const CodeBlock = styled.div`
  margin-top: 1.5rem;
  position: relative;

  @media (min-width: 640px) {
    margin-top: 2rem;
  }
`

const CodeContent = styled.pre`
  background: ${(props) => props.theme.colors.inputBackground};
  border-radius: ${(props) => props.theme.radii.lg};
  padding: 1.25rem;
  overflow-x: auto;
  font-family: "SF Mono", "Menlo", "Monaco", "Consolas", monospace;
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.sm};
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-all;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.border};
    border-radius: 20px;
  }
`

const CopyButton = styled(motion.button)`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: ${(props) => props.theme.colors.card};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.radii.md};
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text};
  box-shadow: ${(props) => props.theme.shadows.sm};
  transition: all ${(props) => props.theme.transitions.fast};

  &:hover {
    background: ${(props) => props.theme.colors.sidebarHoverBackground};
    box-shadow: ${(props) => props.theme.shadows.md};
  }
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

const SuccessMessage = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.colors.success};
  font-weight: 500;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`

// Responsive wrapper for the preview section
const ResponsivePreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 2rem;
    align-items: flex-start;
  }
`

const PreviewInfo = styled.div`
  margin-bottom: 2rem;

  @media (min-width: 1024px) {
    flex: 1;
    margin-bottom: 0;
  }

  p {
    color: ${(props) => props.theme.colors.textMuted};
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
`

const PreviewWidget = styled.div`
  @media (min-width: 1024px) {
    flex: 1;
  }
`

// Add this new component for a better installation guide
const InstallationSteps = styled.div`
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Step = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`

const StepNumber = styled.div`
  background: ${(props) => props.theme.colors.primaryLight};
  color: ${(props) => props.theme.colors.primary};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
`

const StepContent = styled.div`
  flex: 1;

  h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: ${(props) => props.theme.colors.textMuted};
    font-size: 0.875rem;
    line-height: 1.5;
  }
`

// New components for integrations
const IntegrationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`

const IntegrationCard = styled.div`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.radii.lg};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all ${(props) => props.theme.transitions.normal};
  box-shadow: ${(props) => props.theme.shadows.sm};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.md};
    border-color: ${(props) => props.theme.colors.primary};
  }
`

const IntegrationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const IntegrationIcon = styled.div<{ $bgColor: string }>`
  width: 3rem;
  height: 3rem;
  border-radius: ${(props) => props.theme.radii.lg};
  background: ${(props) => props.$bgColor};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: ${(props) => props.theme.shadows.md};
`

const IntegrationInfo = styled.div`
  flex: 1;
`

const IntegrationTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
`

const IntegrationDescription = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textMuted};
  margin: 0;
`

const IntegrationStatus = styled.div<{ $connected: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => (props.$connected ? props.theme.colors.success : props.theme.colors.textMuted)};
  margin-top: 0.5rem;
`

const IntegrationAction = styled(motion.button)`
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
  width: 100%;
  margin-top: auto;
  
  &:hover {
    box-shadow: ${(props) => props.theme.shadows.lg};
    transform: translateY(-2px);
  }
`

const DisconnectButton = styled(motion.button)`
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
  width: 100%;
  margin-top: auto;
  
  &:hover {
    box-shadow: ${(props) => props.theme.shadows.md};
    background: ${(props) => props.theme.colors.cardHover};
  }
`

export default function SettingsPage() {
  const [primaryColor, setPrimaryColor] = useState("#4f46e5")
  const [fontColor, setFontColor] = useState("#ffffff")
  const [fontSize, setFontSize] = useState("14px")
  const [position, setPosition] = useState("bottom-right")
  const [logoUrl, setLogoUrl] = useState("/placeholder.svg?height=40&width=40")
  const [copied, setCopied] = useState(false)
  const [regenerating, setRegenerating] = useState(false)
  const [saved, setSaved] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Integration states
  const [whatsappConnected, setWhatsappConnected] = useState(false)
  const [whatsappNumber, setWhatsappNumber] = useState("")
  const [showWhatsappForm, setShowWhatsappForm] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCopyCode = () => {
    const code = generateWidgetCode()

    // Use the Clipboard API for better compatibility
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(code)
        .then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
        .catch((err) => {
          console.error("Failed to copy: ", err)
          // Fallback to the old method
          fallbackCopyTextToClipboard(code)
        })
    } else {
      // Fallback for browsers that don't support clipboard API
      fallbackCopyTextToClipboard(code)
    }
  }

  // Add this fallback copy function
  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement("textarea")
    textArea.value = text

    // Make the textarea out of viewport
    textArea.style.position = "fixed"
    textArea.style.left = "-999999px"
    textArea.style.top = "-999999px"
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      const successful = document.execCommand("copy")
      if (successful) {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err)
    }

    document.body.removeChild(textArea)
  }

  const handleRegenerateWidget = () => {
    setRegenerating(true)
    // Simulate regeneration - faster response time
    setTimeout(() => {
      setRegenerating(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 800) // Reduced from 1500ms to 800ms
  }

  const generateWidgetCode = () => {
    return `<!-- StoreChatAI Chatbot Widget -->
<script>
(function(s,h,o,p){
  h.StoreChatAI=h.StoreChatAI||{};
  h.StoreChatAI.config={
    storeId: "${Math.random().toString(36).substring(2, 10)}",
    primaryColor: "${primaryColor}",
    position: "${position}",
    fontSize: "${fontSize}"
  };
  var d=s.createElement("script");
  d.async=true;
  d.src="https://cdn.storechat-ai.com/widget.min.js";
  s.head.appendChild(d);
})(document,window);
</script>`
  }

  const handleConnectWhatsapp = () => {
    if (whatsappNumber) {
      setWhatsappConnected(true)
      setShowWhatsappForm(false)
      alert(`WhatsApp integration connected with number: ${whatsappNumber}`)
    } else {
      alert("Please enter a valid WhatsApp number")
    }
  }

  const handleDisconnectWhatsapp = () => {
    setWhatsappConnected(false)
    setWhatsappNumber("")
  }

  if (!mounted) return null

  return (
    <SettingsContainer>
      <SettingsSection>
        <SectionTitle>
          <Sparkles size={20} />
          Widget Customization
        </SectionTitle>

        <FormRow>
          <FormGroup>
            <Label htmlFor="primary-color">Primary Color</Label>
            <ColorPicker
              type="color"
              id="primary-color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="font-color">Font Color</Label>
            <ColorPicker
              type="color"
              id="font-color"
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
            />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <Label htmlFor="logo-url">Logo URL</Label>
          <Input
            type="text"
            id="logo-url"
            placeholder="https://your-store.com/logo.png"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
          />
        </FormGroup>

        <FormRow>
          <FormGroup>
            <Label htmlFor="font-size">Font Size</Label>
            <Select id="font-size" value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
              <option value="12px">Small (12px)</option>
              <option value="14px">Medium (14px)</option>
              <option value="16px">Large (16px)</option>
              <option value="18px">Extra Large (18px)</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="position">Widget Position</Label>
            <Select id="position" value={position} onChange={(e) => setPosition(e.target.value)}>
              <option value="bottom-right">Bottom Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="top-right">Top Right</option>
              <option value="top-left">Top Left</option>
            </Select>
          </FormGroup>
        </FormRow>

        <Button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleRegenerateWidget}
          disabled={regenerating}
        >
          {regenerating ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, ease: "linear" }} // Faster animation
              >
                <RefreshCw size={18} />
              </motion.div>
              Regenerating...
            </>
          ) : (
            <>
              <RefreshCw size={18} />
              Save Changes
            </>
          )}
        </Button>

        {saved && (
          <SuccessMessage initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Check size={16} />
            Changes saved successfully!
          </SuccessMessage>
        )}

        <PreviewContainer>
          <SectionTitle>
            <Bot size={20} />
            Preview
          </SectionTitle>

          <ResponsivePreviewWrapper>
            <PreviewInfo>
              <p>
                This is how your AI chatbot will appear to your customers. Customize the colors, font size, and position
                to match your store's branding.
              </p>
              <p>
                The chatbot will be displayed as a floating button in the corner of your store. When clicked, it will
                expand to show the chat interface.
              </p>
            </PreviewInfo>

            <PreviewWidget>
              <ChatWidgetPreview
                primaryColor={primaryColor}
                fontSize={fontSize}
                fontColor={fontColor}
                position={position}
              >
                <div className="widget-header">
                  <img src={logoUrl || "/placeholder.svg"} alt="Logo" className="widget-logo" />
                  <div className="widget-title">Chat with AI Assistant</div>
                </div>
                <div className="widget-body">
                  <div className="widget-message">Hello! How can I help you with your shopping today?</div>
                  <div className="widget-input">
                    <input className="widget-input-field" placeholder="Type your message..." />
                    <button className="widget-send-button">
                      <Send size={14} />
                    </button>
                  </div>
                </div>
                <div className="widget-toggle">
                  <MessageSquare size={24} />
                </div>
              </ChatWidgetPreview>
            </PreviewWidget>
          </ResponsivePreviewWrapper>
        </PreviewContainer>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>
          <Code size={20} />
          Installation Code
        </SectionTitle>
        <p>Copy and paste this code into your Shopify theme's code editor just before the closing &lt;/body&gt; tag.</p>

        <InstallationSteps>
          <Step>
            <StepNumber>1</StepNumber>
            <StepContent>
              <h4>Copy the installation code</h4>
              <p>Click the copy button to copy the code to your clipboard.</p>
            </StepContent>
          </Step>
          <Step>
            <StepNumber>2</StepNumber>
            <StepContent>
              <h4>Access your Shopify theme</h4>
              <p>Go to your Shopify admin panel, navigate to Online Store → Themes → Edit code.</p>
            </StepContent>
          </Step>
          <Step>
            <StepNumber>3</StepNumber>
            <StepContent>
              <h4>Paste the code</h4>
              <p>Open the theme.liquid file and paste the code just before the closing &lt;/body&gt; tag.</p>
            </StepContent>
          </Step>
          <Step>
            <StepNumber>4</StepNumber>
            <StepContent>
              <h4>Save and publish</h4>
              <p>Save your changes and publish your theme to make the chatbot live on your store.</p>
            </StepContent>
          </Step>
        </InstallationSteps>

        <CodeBlock>
          <CodeContent id="installation-code">{generateWidgetCode()}</CodeContent>
          <CopyButton
            onClick={handleCopyCode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={copied ? "Copied!" : "Copy to clipboard"}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </CopyButton>
          {copied && (
            <SuccessMessage
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ position: "absolute", bottom: "-30px", right: "0" }}
            >
              <Check size={16} />
              Copied to clipboard!
            </SuccessMessage>
          )}
        </CodeBlock>
      </SettingsSection>

      {/* Channel Integrations Section - Now placed after Installation Code */}
      <SettingsSection>
        <SectionTitle>
          <Link2 size={20} />
          Channel Integrations
        </SectionTitle>
        <p>Connect your chatbot to other messaging platforms to reach your customers wherever they are.</p>

        <IntegrationsGrid>
          <IntegrationCard>
            <IntegrationHeader>
              <IntegrationIcon $bgColor="#25D366">
                <Phone size={24} />
              </IntegrationIcon>
              <IntegrationInfo>
                <IntegrationTitle>WhatsApp</IntegrationTitle>
                <IntegrationDescription>
                  Connect your chatbot to WhatsApp to engage with customers on the world's most popular messaging app.
                </IntegrationDescription>
                {whatsappConnected && (
                  <IntegrationStatus $connected={true}>
                    <Check size={14} /> Connected to {whatsappNumber}
                  </IntegrationStatus>
                )}
              </IntegrationInfo>
            </IntegrationHeader>

            {!whatsappConnected ? (
              <>
                {!showWhatsappForm ? (
                  <IntegrationAction
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowWhatsappForm(true)}
                  >
                    <Phone size={16} />
                    Connect WhatsApp
                  </IntegrationAction>
                ) : (
                  <>
                    <FormGroup>
                      <Label htmlFor="whatsapp-number">WhatsApp Business Number</Label>
                      <Input
                        type="text"
                        id="whatsapp-number"
                        placeholder="+1 (555) 123-4567"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                      />
                    </FormGroup>
                    <FormRow>
                      <Button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleConnectWhatsapp}>
                        <ArrowRight size={16} />
                        Connect
                      </Button>
                      <Button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowWhatsappForm(false)}
                        style={{ background: "transparent", color: "#64748b", border: "1px solid #e2e8f0" }}
                      >
                        Cancel
                      </Button>
                    </FormRow>
                  </>
                )}
              </>
            ) : (
              <DisconnectButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDisconnectWhatsapp}
              >
                Disconnect WhatsApp
              </DisconnectButton>
            )}
          </IntegrationCard>

          <IntegrationCard>
            <IntegrationHeader>
              <IntegrationIcon $bgColor="#E1306C">
                <Instagram size={24} />
              </IntegrationIcon>
              <IntegrationInfo>
                <IntegrationTitle>Instagram</IntegrationTitle>
                <IntegrationDescription>
                  Connect your chatbot to Instagram DMs to engage with customers on this popular social platform.
                </IntegrationDescription>
                <IntegrationStatus $connected={false}>Not connected</IntegrationStatus>
              </IntegrationInfo>
            </IntegrationHeader>

            <IntegrationAction
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => alert("Instagram integration coming soon!")}
            >
              <Instagram size={16} />
              Coming Soon
            </IntegrationAction>
          </IntegrationCard>

          <IntegrationCard>
            <IntegrationHeader>
              <IntegrationIcon $bgColor="#4267B2">
                <MessageCircle size={24} />
              </IntegrationIcon>
              <IntegrationInfo>
                <IntegrationTitle>Facebook Messenger</IntegrationTitle>
                <IntegrationDescription>
                  Connect your chatbot to Facebook Messenger to engage with customers on this popular platform.
                </IntegrationDescription>
                <IntegrationStatus $connected={false}>Not connected</IntegrationStatus>
              </IntegrationInfo>
            </IntegrationHeader>

            <IntegrationAction
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => alert("Facebook Messenger integration coming soon!")}
            >
              <MessageCircle size={16} />
              Coming Soon
            </IntegrationAction>
          </IntegrationCard>

          <IntegrationCard>
            <IntegrationHeader>
              <IntegrationIcon $bgColor="#0088cc">
                <Smartphone size={24} />
              </IntegrationIcon>
              <IntegrationInfo>
                <IntegrationTitle>SMS</IntegrationTitle>
                <IntegrationDescription>
                  Connect your chatbot to SMS to engage with customers via text messages.
                </IntegrationDescription>
                <IntegrationStatus $connected={false}>Not connected</IntegrationStatus>
              </IntegrationInfo>
            </IntegrationHeader>

            <IntegrationAction
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => alert("SMS integration coming soon!")}
            >
              <Smartphone size={16} />
              Coming Soon
            </IntegrationAction>
          </IntegrationCard>
        </IntegrationsGrid>
      </SettingsSection>
    </SettingsContainer>
  )
}

