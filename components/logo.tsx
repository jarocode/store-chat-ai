import styled from "styled-components"
import { Store, Phone } from "lucide-react"

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const LogoIcon = styled.div`
  background: ${(props) => props.theme.colors.primaryGradient};
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.3);
  position: relative;
`

const StoreIconWrapper = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
`

const PhoneIconWrapper = styled.div`
  position: absolute;
  bottom: 4px;
  right: 4px;
  transform: rotate(15deg);
`

const LogoText = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  background: ${(props) => props.theme.colors.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
  font-family: ${(props) => props.theme.fonts.heading};
`

export default function Logo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const iconSize = size === "small" ? 16 : size === "large" ? 24 : 20
  const storeIconSize = iconSize * 0.8
  const phoneIconSize = iconSize * 0.7

  return (
    <LogoContainer>
      <LogoIcon>
        <StoreIconWrapper>
          <Store size={storeIconSize} />
        </StoreIconWrapper>
        <PhoneIconWrapper>
          <Phone size={phoneIconSize} />
        </PhoneIconWrapper>
      </LogoIcon>
      <LogoText>StoreChatAI</LogoText>
    </LogoContainer>
  )
}

