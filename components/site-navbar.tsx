"use client"

// Next.js
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

// Components
import { Separator } from "@/components/ui/separator"

// Icons
import { LayoutDashboard } from "lucide-react"

// Stack Auth
import { UserButton, useUser } from "@stackframe/stack"
import LegalDropdown from "@/app/legal/_components/legal-dropdown"

export default function SiteNavbar() {
  const router = useRouter()
  const user = useUser()
  const teamId = user?.selectedTeam?.id

  // Navigate to dashboard
  const handleToDashboard = () => {
    if (!teamId) {
      router.push("/")
      return
    }
    router.push(`/team/${teamId}/dashboard`)
  }

  return (
    <nav className="flex items-center px-4 sm:px-6 lg:px-8 sticky top-0 z-50 h-(--header-height) bg-white/50 backdrop-blur-2xl">
      <div className="flex w-full items-center gap-1 lg:gap-2 py-3 sm:py-4">
        <Link href="/" rel="home" className="flex items-center shrink-0">
          <Image
            src="/clokin-app.png"
            alt="ClokIn Logo"
            width={150}
            height={50}
            className="w-24 h-auto sm:w-[120px] lg:w-[150px] aspect-auto hover:opacity-70 transition-opacity"
          />
        </Link>
        <div className="ml-auto flex items-center gap-1 sm:gap-2 lg:gap-6 font-sans">
          {/* Hide legal dropdown on small screens to save space */}
          <div className="hidden sm:block">
            <LegalDropdown />
          </div>
          <UserButton
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
    </nav>
  )
}
