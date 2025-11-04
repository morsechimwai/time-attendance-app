// NextJS
import { Metadata } from "next"

// Providers
import AppProviders from "@/app/_providers/app-providers"

// Components
import AppSidebar from "@/components/app-sidebar"
import SiteHeader from "@/components/site-header"

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: "%s | FaceShift",
  },

  description: "Dashboard - Manage your time and attendance efficiently with FaceShift.",
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AppProviders>
      <AppSidebar />
      <main className="w-full">
        <SiteHeader />
        {children}
      </main>
    </AppProviders>
  )
}
