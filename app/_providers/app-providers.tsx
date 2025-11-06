"use client"

import { StackProvider, StackTheme } from "@stackframe/stack"
import { stackClientApp } from "@/stack/client"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function AppProviders({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <StackProvider app={stackClientApp}>
      <StackTheme>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </StackTheme>
    </StackProvider>
  )
}
