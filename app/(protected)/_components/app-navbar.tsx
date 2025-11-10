"use client"

// Next.js
import { usePathname, useRouter } from "next/navigation"

// Components

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

// Utils
import { normalizePath } from "@/lib/utils/navigation"
import { UserButton } from "@stackframe/stack"
// import { useTheme } from "next-themes"
// import { useCallback } from "react"
import { House } from "lucide-react"
import LegalDropdown from "@/app/legal/_components/legal-dropdown"
import RealTimeClock from "@/app/(protected)/_components/real-time-clock"

export default function AppNavbar() {
  // Get current pathname
  const pathname = usePathname()
  const router = useRouter()

  // Theme
  // const { theme, setTheme } = useTheme()

  // Theme toggle
  // const handleThemeToggle = useCallback(() => {
  //   setTheme(theme === "light" ? "dark" : "light")
  // }, [theme, setTheme])

  // Navigate to home
  const handleToHome = () => {
    router.push("/")
  }

  // Determine current path name
  const currentPath =
    normalizePath(pathname).split("/").pop() === "dashboard"
      ? "dashboard"
      : normalizePath(pathname).split("/").pop() === "attendance"
      ? "time records"
      : normalizePath(pathname).split("/").pop() === "payroll"
      ? "payroll"
      : normalizePath(pathname).split("/").pop() === "employees"
      ? "employees"
      : null

  return (
    <nav className="flex items-center px-4 sm:px-6 lg:px-8 sticky top-0 z-50 h-(--header-height) bg-white/50 backdrop-blur-2xl border-b border-neutral-200/60">
      <div className="flex w-full items-center gap-1 lg:gap-2 py-3 sm:py-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium capitalize font-sans">
                {currentPath}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-1 sm:gap-2 lg:gap-6 font-sans">
          <RealTimeClock className="hidden md:flex" showDate={false} format="24h" />
          {/* Hide legal dropdown on small screens to save space */}
          <div className="hidden sm:block">
            <LegalDropdown />
          </div>
          <UserButton
            // colorModeToggle={handleThemeToggle}
            extraItems={[
              {
                text: "Go to home",
                icon: <House className="size-4" />,
                onClick: handleToHome,
              },
            ]}
          />
        </div>
      </div>
    </nav>
  )
}
