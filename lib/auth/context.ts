import { headers } from "next/headers"
import { prisma } from "@/lib/db/prisma"

export async function getAuthContext() {
  const h = await headers()
  const userId = h.get("x-user-id")

  if (!userId) return null

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, orgId: true, role: true },
  })

  if (!user?.orgId) return null

  return {
    userId: user.id,
    orgId: user.orgId,
    role: user.role,
  }
}

export async function requireAuth() {
  const ctx = await getAuthContext()
  if (!ctx) throw new Error("Unauthorized")
  return ctx
}
