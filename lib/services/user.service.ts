// lib/services/user.service.ts

import { stackServerApp } from "@/stack/server"
import { requireAuthContext } from "@/lib/auth/context"
import { AppError } from "@/lib/errors/app-error"

export async function getCurrentTeam() {
  const { userId } = await requireAuthContext()
  const team = await stackServerApp.getTeam(userId).catch(() => null)
  if (!team) throw new AppError("FORBIDDEN", "No team found")
  return team
}
