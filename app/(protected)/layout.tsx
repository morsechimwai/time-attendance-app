// NextJS
import { Metadata } from "next"

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

export default async function ProtectedLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params?: { [key: string]: string | string[] }
}>) {
  const paramTeamId = params?.id
  const teamId = Array.isArray(paramTeamId) ? paramTeamId[0] : paramTeamId

  return (
    <>
      <AppSidebar teamId={teamId} />
      <main className="w-full min-h-screen">
        <SiteHeader />
        {children}
      </main>
    </>
  )
}
