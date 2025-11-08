"use client"

// React
import { useCallback } from "react"

// Next.js
import { useTheme } from "next-themes"
import Link from "next/link"
import Image from "next/image"

// Icons
import { LayoutDashboard } from "lucide-react"

// Stack Auth
import { UserButton, useUser } from "@stackframe/stack"
import { useRouter } from "next/navigation"
import LegalDropdown from "@/app/legal/_components/legal-dropdown"

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
    <nav className="w-full px-4 sm:px-6 lg:px-8 sticky top-0 z-10 bg-background/20 backdrop-blur-xl border-b">
      <div className="max-w-7xl mx-auto">
        <div className="flex w-full items-center justify-between py-3 sm:py-4 gap-2 sm:gap-4">
          <Link href="/" rel="home" className="flex items-center shrink-0">
            <Image
              src="/clokin-logo.png"
              alt="ClokIn Logo"
              width={150}
              height={50}
              className="w-24 h-auto sm:w-[120px] lg:w-[150px] aspect-auto hover:opacity-70 transition-opacity"
            />
          </Link>

          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 font-sans">
            {/* Hide legal dropdown on small screens to save space */}
            <div className="hidden sm:block">
              <LegalDropdown />
            </div>
            <div className="p-1.5 sm:p-2">
              <UserButton
                // colorModeToggle={handleThemeToggle}
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
      </div>
    </nav>
  )
}
