"use client"

// Next.js
import { usePathname } from "next/navigation"

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

export default function SiteHeader() {
  // Get current pathname
  const pathname = usePathname()

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
    <header className="flex items-center border-b px-4 sticky top-0 z-10 bg-background h-12">
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
        <div className="ml-auto flex items-center gap-2 font-sans">
          <Button size="sm" variant="outline">
            Feedback
          </Button>
        </div>
      </div>
    </header>
  )
}
