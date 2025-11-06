// lib/services/team.service.ts
import { stackServerApp } from "@/stack/server"
import { requireAuthContext } from "@/lib/auth/context"
import { AppError } from "@/lib/errors/app-error"

export async function getCurrentTeam() {
  const { userId } = await requireAuthContext()

  const user = await stackServerApp.getUser(userId).catch(() => null)
  if (!user) {
    throw new AppError("FORBIDDEN", "User not found")
  }

  const team = user.selectedTeam
  if (!team) {
    throw new AppError("FORBIDDEN", "No team selected")
  }

  return team
}
