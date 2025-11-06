"use client"

// React
import { useCallback, useEffect } from "react"

// NextJS
import Link from "next/link"
import { usePathname } from "next/navigation"

// Icons
import { Banknote, Clock, LayoutDashboard, LucideIcon, Users } from "lucide-react"

// Components
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

// Utils
import { isActive } from "@/lib/utils/navigation"
import { SelectedTeamSwitcher, UserButton, useUser } from "@stackframe/stack"
import { useTheme } from "next-themes"

interface NavigationItem {
  label: string
  href: string
  icon: LucideIcon
}

interface NavigationGroup {
  label: string
  items: NavigationItem[]
}

// Navigation items
const navigationGroups: NavigationGroup[] = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Time Records", // หรือ "Attendance"
        href: "/attendance",
        icon: Clock, // History -> Clock ดูธรรมชาติกว่า
      },
      {
        label: "Payroll",
        href: "/payroll",
        icon: Banknote, // เงินเด่นๆ
      },
    ],
  },
  {
    label: "People",
    items: [
      {
        label: "Employees",
        href: "/employees",
        icon: Users, // Users2 ok แต่ Users แทน HR app มากกว่า
      },
    ],
  },
]

export default function AppSidebar() {
  // Current pathname
  const pathname = usePathname()

  // Theme
  const { theme, setTheme } = useTheme()

  // Sidebar state
  const { isMobile, setOpenMobile } = useSidebar()

  // Stack Auth
  const user = useUser()
  const currentTeam = user?.selectedTeam ?? null

  // Handlers
  const handleNavigate = useCallback(() => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }, [isMobile, setOpenMobile])

  // Theme toggle
  const handleThemeToggle = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light")
  }, [theme, setTheme])

  // Close sidebar on navigation (mobile)
  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }, [pathname, isMobile, setOpenMobile])

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="h-(--header-height) border-b">
        <SidebarMenuButton variant="default" asChild>
          <Link className="flex items-center h-full px-4" href="#" onClick={handleNavigate}>
            <span className="text-xl font-black font-sans ">FaceIN</span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent className="px-2 mt-6">
        <SidebarGroup>
          {navigationGroups.map((group) => (
            <div key={group.label}>
              <SidebarGroupLabel className="uppercase font-sans font-bold">
                {group.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const active = isActive(pathname, item.href)
                      return (
                        <SidebarMenuItem key={item.label}>
                          <SidebarMenuButton
                            asChild
                            isActive={active}
                            aria-current={active ? "page" : undefined}
                          >
                            <Link href={item.href} onClick={handleNavigate}>
                              <item.icon />
                              <span className="capitalize font-sans font-semibold">
                                {item.label}
                              </span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    })}
                  </div>
                </SidebarMenu>
              </SidebarGroupContent>
            </div>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto border-t">
        <div className="space-y-1.5">
          <SelectedTeamSwitcher
            selectedTeam={currentTeam ?? undefined}
            triggerClassName="w-full justify-between"
          />
        </div>
      </SidebarFooter>
      <SidebarFooter className="mt-auto border-t">
        <UserButton showUserInfo={true} colorModeToggle={handleThemeToggle} />
      </SidebarFooter>
    </Sidebar>
  )
}
