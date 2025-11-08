import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface BackdropWrapperProps {
  children: ReactNode
  className?: string
  intensity?: "light" | "medium" | "strong"
  blur?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
  tint?: "white" | "neutral" | "sky" | "blue" | "slate" | "transparent"
}

export default function BackdropWrapper({
  children,
  className = "",
  intensity = "medium",
  blur = "3xl",
  tint = "white",
}: BackdropWrapperProps) {
  // Background opacity based on intensity
  const getIntensityClass = () => {
    switch (intensity) {
      case "light":
        return "bg-opacity-10"
      case "strong":
        return "bg-opacity-50"
      default: // medium
        return "bg-opacity-30"
    }
  }

  // Blur class mapping
  const getBlurClass = () => {
    switch (blur) {
      case "none":
        return ""
      case "sm":
        return "backdrop-blur-sm"
      case "md":
        return "backdrop-blur-md"
      case "lg":
        return "backdrop-blur-lg"
      case "xl":
        return "backdrop-blur-xl"
      case "2xl":
        return "backdrop-blur-2xl"
      case "3xl":
        return "backdrop-blur-3xl"
      default:
        return "backdrop-blur-3xl"
    }
  }

  // Background tint color
  const getTintClass = () => {
    const intensityClass = getIntensityClass()

    switch (tint) {
      case "neutral":
        return `bg-neutral-100 ${intensityClass}`
      case "sky":
        return `bg-sky-100 ${intensityClass}`
      case "blue":
        return `bg-blue-100 ${intensityClass}`
      case "slate":
        return `bg-slate-100 ${intensityClass}`
      case "transparent":
        return "bg-transparent"
      default: // white
        return `bg-white ${intensityClass}`
    }
  }

  return (
    <div
      className={cn(
        "relative z-10 min-h-screen flex flex-col",
        getBlurClass(),
        getTintClass(),
        className
      )}
    >
      {children}
    </div>
  )
}
