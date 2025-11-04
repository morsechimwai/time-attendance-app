// lib/auth/context.ts
import { headers } from "next/headers"
import { prisma } from "../db/prisma"

export async function getAuthContext() {
  const h = await headers()
  const userId = h.get("x-user-id")

  if (!userId) return null

  // fetch org (MVP: one org per user)
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, orgId: true, name: true },
  })

  if (!user || !user.orgId) return null

  return {
    userId: user.id,
    orgId: user.orgId,
    name: user.name,
  }
}

export async function requireAuth() {
  const ctx = await getAuthContext()
  if (!ctx) throw new Error("Unauthorized")
  return ctx
}
