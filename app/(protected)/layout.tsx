// NextJS
import { Metadata } from "next"

// Components
import AppSidebar from "@/app/(protected)/_components/app-sidebar"
import AppNavbar from "@/app/(protected)/_components/app-navbar"

export const metadata: Metadata = {
  metadataBase: new URL("https://clokin.app"),
  title: {
    default: "Dashboard",
    template: "%s | ClokIn",
  },
  description: "Dashboard for managing time and attendance efficiently with ClokIn.",
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
    <div className="flex min-h-svh w-full">
      <AppSidebar teamId={teamId} />
      <div className="flex flex-1 flex-col">
        <AppNavbar />
        <section className="flex-1 overflow-auto">{children}</section>
      </div>
    </div>
  )
}
