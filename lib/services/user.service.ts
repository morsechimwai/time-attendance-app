// lib/services/user.service.ts

// Database
import { prisma } from "@/lib/db/prisma"

// Error Handling
import { withErrorHandling } from "@/lib/errors/with-error-handling"
import { AppError } from "@/lib/errors/app-error"
import type { UserDTO, CreateUser } from "@/lib/types/user.type"

export const getUser = withErrorHandling(async (userId: string): Promise<UserDTO | null> => {
  if (!userId) throw new AppError("BAD_REQUEST", "Missing user ID")

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, orgId: true },
  })

  return user
})

export async function ensureUserExists(meta: {
  userId: string
  email?: string
  name?: string
  orgId?: string | null
}) {
  const existing = await prisma.user.findUnique({ where: { id: meta.userId } })
  if (existing) return existing

  return prisma.user.create({
    data: {
      id: meta.userId,
      email: meta.email ?? "",
      name: meta.name ?? "",
      orgId: meta.orgId ?? null,
    },
  })
}
