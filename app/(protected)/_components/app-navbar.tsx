"use client"

// Next.js
import { usePathname, useRouter } from "next/navigation"

// Components
import { Button } from "@/components/ui/button"
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
import { useTheme } from "next-themes"
import { useCallback } from "react"
import { CircleQuestionMark, House } from "lucide-react"
import LegalDropdown from "@/app/legal/_components/legal-dropdown"

export default function AppNavbar() {
  // Get current pathname
  const pathname = usePathname()
  const router = useRouter()

  // Theme
  const { theme, setTheme } = useTheme()

  // Theme toggle
  const handleThemeToggle = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light")
  }, [theme, setTheme])

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
    <nav className="flex items-center border-b px-4 sticky top-0 z-10 bg-background h-(--header-height)">
      <div className="flex w-full items-center gap-1 lg:gap-2">
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
        <div className="ml-auto flex items-center gap-1 lg:gap-2 font-sans">
          <LegalDropdown />
          <div className="p-2 mt-2">
            <UserButton
              colorModeToggle={handleThemeToggle}
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
