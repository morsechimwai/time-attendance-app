// lib/auth/context.ts
import { headers } from "next/headers"
import { ensureUserExists } from "@/lib/services/user.service"

export async function getAuthContext() {
  const h = await headers()
  const userId = h.get("x-user-id")
  if (!userId) return null

  const user = await ensureUserExists({
    userId,
    email: h.get("x-user-email") ?? undefined,
    name: h.get("x-user-name") ?? undefined,
    orgId: h.get("x-user-org-id") ?? null,
  })

  return { userId: user.id, orgId: user.orgId }
}

export async function requireAuth() {
  const ctx = await getAuthContext()
  if (!ctx) throw new Error("Unauthorized")
  return ctx
}
