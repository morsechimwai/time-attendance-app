// NextJS
import { Metadata } from "next"

import { getAuthContext } from "@/lib/auth/context"
import ProtectedLayout from "../(protected)/layout"

export const metadata: Metadata = {
  metadataBase: new URL("https://face.in"),
  title: {
    default: "Account settings",
    template: "%s | FaceIN",
  },
  description: "Dashboard for managing time and attendance efficiently with FaceIN.",
}

export default async function HandlerLayout({ children }: { children: React.ReactNode }) {
  const ctx = await getAuthContext()
  if (!ctx) return <>{children}</>

  return <ProtectedLayout>{children}</ProtectedLayout>
}
