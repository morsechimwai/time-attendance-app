"use client"

// React
import { useCallback, useEffect } from "react"

// NextJS
import Link from "next/link"
import { usePathname } from "next/navigation"

// Icons
import {
  Banknote,
  Clock,
  LayoutDashboard,
  LucideIcon,
  MessageCircleMore,
  Users,
} from "lucide-react"

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
import { isActive, withTeamPath } from "@/lib/utils/navigation"
import { SelectedTeamSwitcher, useUser } from "@stackframe/stack"
import { Button } from "@/components/ui/button"

interface NavigationItem {
  label: string
  href: string
  icon: LucideIcon
}

interface NavigationGroup {
  label: string
  items: NavigationItem[]
}

interface AppSidebarProps {
  teamId?: string
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

export default function AppSidebar({ teamId }: AppSidebarProps = {}) {
  // Current pathname
  const pathname = usePathname()

  // Sidebar state
  const { isMobile, setOpenMobile } = useSidebar()

  // Stack Auth
  const user = useUser()
  const currentTeam = user?.selectedTeam ?? null

  // Determine the team context for navigation
  const activeTeamId = teamId ?? currentTeam?.id ?? null

  // Handlers
  const handleNavigate = useCallback(() => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }, [isMobile, setOpenMobile])

  // Feedback handler
  const handleFeedback = () => {
    console.log("Feedback button clicked")
  }

  // Close sidebar on navigation (mobile)
  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }, [pathname, isMobile, setOpenMobile])

  return (
    <aside>
      <Sidebar collapsible="offcanvas">
        <SidebarHeader className="h-(--header-height) border-b">
          <div className="px-2">
            <SelectedTeamSwitcher
              selectedTeam={currentTeam ?? undefined}
              triggerClassName="border-0 ring-0 shadow-none bg-transparent hover:bg-transparent focus:bg-transparent"
            />
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2">
          <SidebarGroup className="space-y-6">
            {navigationGroups.map((group) => (
              <div key={group.label}>
                <SidebarGroupLabel className="uppercase font-sans font-bold">
                  {group.label}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <div className="space-y-1">
                      {group.items.map((item) => {
                        const targetHref = withTeamPath(activeTeamId, item.href)
                        const active = isActive(pathname, targetHref)
                        return (
                          <SidebarMenuItem key={item.label}>
                            <SidebarMenuButton
                              asChild
                              isActive={active}
                              aria-current={active ? "page" : undefined}
                            >
                              <Link href={targetHref} onClick={handleNavigate}>
                                <item.icon />
                                <span className="capitalize font-sans">{item.label}</span>
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
          <div className="p-2">
            <Button className="w-full" variant="outline" onClick={handleFeedback}>
              <MessageCircleMore />
              <span>Feedback</span>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </aside>
  )
}
