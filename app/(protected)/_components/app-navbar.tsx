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
    <nav className="flex items-center sticky top-0 z-50 bg-white/50 backdrop-blur-2xl border-b border-neutral-200">
      <div className="flex w-full items-center gap-4">
        <div className="p-2.5">
          <SidebarTrigger />
        </div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold capitalize font-sans">
                {currentPath}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-1 sm:gap-2 lg:gap-4 font-sans">
          <div className="p-2">
            <RealTimeClock className="hidden md:flex" showDate={false} format="24h" />
          </div>
          {/* Hide legal dropdown on small screens to save space */}
          <div className="hidden sm:block p-2">
            <LegalDropdown />
          </div>
          <div className="p-2">
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
      </div>
    </nav>
  )
}
