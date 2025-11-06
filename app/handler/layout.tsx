import { getAuthContext } from "@/lib/auth/context"
import ProtectedLayout from "../(protected)/layout"

export default async function HandlerLayout({ children }: { children: React.ReactNode }) {
  const ctx = await getAuthContext()
  if (!ctx) return <>{children}</>

  return <ProtectedLayout>{children}</ProtectedLayout>
}
