"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

interface RealTimeClockProps {
  className?: string
  showSeconds?: boolean
  showDate?: boolean
  format?: "12h" | "24h"
}

export default function RealTimeClock({
  className = "",
  showSeconds = true,
  showDate = false,
  format = "24h",
}: RealTimeClockProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      ...(showSeconds && { second: "2-digit" }),
      hour12: format === "12h",
    }
    return date.toLocaleTimeString("th-TH", options)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("th-TH", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div
      className={`flex items-center gap-2 text-sm font-mono px-3 py-2 border border-border rounded-lg bg-background/50 backdrop-blur-sm ${className}`}
    >
      <Clock className="h-4 w-4 text-muted-foreground" />
      <div className="flex flex-col items-end">
        <span className="font-medium tabular-nums">{formatTime(currentTime)}</span>
        {showDate && (
          <span className="text-xs text-muted-foreground font-sans">{formatDate(currentTime)}</span>
        )}
      </div>
    </div>
  )
}
