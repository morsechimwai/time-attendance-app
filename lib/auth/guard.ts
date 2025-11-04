// lib/auth/guard.ts
import { requireAuth } from "@/lib/auth/context"

export async function requireAdmin() {
  const ctx = await requireAuth()
  // MVP: everyone = admin
  return ctx
}

export async function requireOrgContext() {
  return requireAuth()
}
