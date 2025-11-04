import { SidebarProvider } from "@/components/ui/sidebar"

export default function AppProviders({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <SidebarProvider>{children}</SidebarProvider>
}
