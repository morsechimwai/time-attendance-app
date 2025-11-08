import { ReactNode } from "react"
import AnimatedBackground from "./animated-background"
import BackdropWrapper from "./backdrop-wrapper"

interface MainBackgroundProps {
  children: ReactNode
  backgroundVariant?: "default" | "minimal" | "intense"
  backdropIntensity?: "light" | "medium" | "strong"
  backdropBlur?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
  backdropTint?: "white" | "neutral" | "sky" | "blue" | "slate" | "transparent"
  className?: string
}

/**
 * MainBackground - A complete page wrapper with animated background and backdrop
 *
 * Usage examples:
 *
 * // Default settings
 * <MainBackground>
 *   <YourContent />
 * </MainBackground>
 *
 * // Minimal background, light backdrop
 * <MainBackground backgroundVariant="minimal" backdropIntensity="light">
 *   <YourContent />
 * </MainBackground>
 *
 * // Intense background, strong backdrop with sky tint
 * <MainBackground
 *   backgroundVariant="intense"
 *   backdropIntensity="strong"
 *   backdropTint="sky"
 * >
 *   <YourContent />
 * </MainBackground>
 *
 * // Auth pages - transparent backdrop
 * <MainBackground
 *   backgroundVariant="default"
 *   backdropTint="transparent"
 *   backdropBlur="none"
 * >
 *   <YourContent />
 * </MainBackground>
 */
export default function MainBackground({
  children,
  backgroundVariant = "default",
  backdropIntensity = "medium",
  backdropBlur = "3xl",
  backdropTint = "white",
  className = "",
}: MainBackgroundProps) {
  return (
    <div className={`min-h-screen flex flex-col relative ${className}`}>
      {/* Animated Background */}
      <AnimatedBackground variant={backgroundVariant} />

      {/* Content with Backdrop */}
      <BackdropWrapper intensity={backdropIntensity} blur={backdropBlur} tint={backdropTint}>
        {children}
      </BackdropWrapper>
    </div>
  )
}
