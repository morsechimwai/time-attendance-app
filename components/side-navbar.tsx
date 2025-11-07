"use client"

// React
import { useCallback } from "react"

// Next.js
import { useTheme } from "next-themes"

// Components
import { Button } from "@/components/ui/button"

// Icons
import { CircleQuestionMark, LayoutDashboard } from "lucide-react"

// Stack Auth
import { UserButton, useUser } from "@stackframe/stack"
import { useRouter } from "next/navigation"

export default function SiteNavbar() {
  // Theme
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const user = useUser()
  const teamId = user?.selectedTeam?.id

  // Theme toggle
  const handleThemeToggle = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light")
  }, [theme, setTheme])

  // Navigate to dashboard
  const handleToDashboard = () => {
    if (!teamId) {
      router.push("/")
      return
    }
    router.push(`/team/${teamId}/dashboard`)
  }

  return (
    <nav className="w-full border-b px-4 sticky top-0 z-10 bg-background h-(--header-height)">
      <div className="flex w-full items-center gap-1 lg:gap-2">
        <div></div>
        <div className="ml-auto flex items-center gap-1 lg:gap-2 font-sans">
          <Button variant="ghost" size="sm">
            <CircleQuestionMark />
          </Button>
          <div className="p-2 mt-1">
            <UserButton
              colorModeToggle={handleThemeToggle}
              extraItems={[
                {
                  text: "Dashboard",
                  icon: <LayoutDashboard className="size-4" />,
                  onClick: handleToDashboard,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}
