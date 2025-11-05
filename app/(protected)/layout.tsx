// NextJS
import { Metadata } from "next"

// Providers
import AppProviders from "@/app/_providers/app-providers"

// Components
import AppSidebar from "@/components/app-sidebar"
import SiteHeader from "@/components/site-header"

export const metadata: Metadata = {
  metadataBase: new URL("https://face.in"),
  title: {
    default: "Dashboard",
    template: "%s | FaceIN",
  },
  description: "Dashboard for managing time and attendance efficiently with FaceIN.",
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
