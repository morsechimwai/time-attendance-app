import { requireAuth } from "@/lib/auth/context"

export async function requireOrgContext() {
  return requireAuth()
}

export async function requireAdmin() {
  const ctx = await requireAuth()
  if (ctx.role !== "ADMIN") throw new Error("Forbidden")
  return ctx
}
