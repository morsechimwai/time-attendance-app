// lib/auth/context.ts

import { headers } from "next/headers"
import { AppError } from "@/lib/errors/app-error"

export type AuthContext = {
  userId: string
  teamId: string | null
  email?: string | null
}

/** ใช้ใน server components / services */
export async function getAuthContext(): Promise<AuthContext | null> {
  const h = await headers()
  const userId = h.get("x-facein-user-id")
  if (!userId) return null

  return {
    userId,
    teamId: h.get("x-facein-team-id"),
    email: h.get("x-facein-user-email"),
  }
}

/** Strict version — throw ถ้าไม่มี user */
export async function requireAuthContext(): Promise<AuthContext> {
  const ctx = await getAuthContext()
  if (!ctx?.userId) {
    throw new AppError("UNAUTHORIZED", "User is not authenticated")
  }
  return ctx
}
