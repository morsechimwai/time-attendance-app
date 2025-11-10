"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircleMore, Send } from "lucide-react"

interface FeedbackDropdownProps {
  className?: string
}

export default function FeedbackDropdown({ className }: FeedbackDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Replace with actual feedback submission logic
      console.log("Feedback submitted:", feedback)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Reset form and close dropdown
      setFeedback("")
      setIsOpen(false)

      // Show success message (you might want to use a toast notification)
      alert("Thank you for your feedback! We appreciate your input.")
    } catch (error) {
      console.error("Failed to submit feedback:", error)
      alert("Failed to submit feedback. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setFeedback("")
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button className={className} variant="outline">
          <MessageCircleMore />
          <span>Feedback</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-4" align="end" side="top">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MessageCircleMore className="h-4 w-4" />
            <span className="font-medium">Send Feedback</span>
          </div>
          <Textarea
            placeholder="Tell us what you think... Share your thoughts, suggestions, or report any issues."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[100px] resize-none"
            disabled={isSubmitting}
            autoFocus
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={!feedback.trim() || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent mr-1" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-3 w-3 mr-1" />
                  Send
                </>
              )}
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
