// lib/auth/context.ts
"use server"

import { stackServerApp } from "@/stack/server"
import { AppError } from "@/lib/errors/app-error"

export type AuthContext = {
  userId: string
  teamId?: string | null
}

// ใช้สำหรับ layout หรือ page ที่แค่ต้องรู้ว่ามี user หรือไม่
export async function getAuthContext(): Promise<AuthContext | null> {
  const user = await stackServerApp.getUser().catch(() => null)
  if (!user) return null
  return { userId: user.id, teamId: user.selectedTeam?.id ?? null }
}

// ใช้สำหรับ server action หรือ API ที่ต้อง enforce login
export async function requireAuthContext(): Promise<AuthContext> {
  const ctx = await getAuthContext()
  if (!ctx) throw new AppError("UNAUTHORIZED", "User is not authenticated")
  return ctx
}
