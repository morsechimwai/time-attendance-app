// proxy.ts

import { NextRequest, NextResponse } from "next/server"
import { stackServerApp } from "@/stack/server"

// ------------------------------
// CONFIG
// ------------------------------
const PUBLIC_PATHS = [
  "/_next",
  "/api/public",
  "/favicon.ico",
  "/signin",
  "/signup",
  "/legal",
  "/", // home
]

const PUBLIC_FILE_REGEX = /\.[^/]+$/ // .css, .js, .png etc
const PROTECTED_PATHS = [
  "/dashboard",
  "/employees",
  "/attendance",
  "/payroll",
  "/kiosk",
  "/settings",
]

// Helpers
function isPublic(pathname: string): boolean {
  return (
    PUBLIC_PATHS.some((p) => (p === "/" ? pathname === "/" : pathname.startsWith(p))) ||
    PUBLIC_FILE_REGEX.test(pathname)
  )
}

// Check if the path is protected
function isProtected(pathname: string): boolean {
  return (
    pathname.startsWith("/team/") ||
    PROTECTED_PATHS.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
  )
}

export async function proxy(request: NextRequest) {
  const { nextUrl, method } = request
  const pathname = nextUrl.pathname

  // Skip preflight requests
  if (method === "OPTIONS") {
    return NextResponse.next()
  }

  // Redirect authenticated users hitting the home page to their team dashboard
  if (pathname === "/") {
    const user = await stackServerApp.getUser({ tokenStore: request }).catch(() => null)

    const selectedTeam = user?.selectedTeam
    if (selectedTeam?.id) {
      const redirectUrl = new URL(`/team/${selectedTeam.id}/dashboard/`, request.url)
      return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
  }

  // Skip public routes or anything not marked as protected
  if (isPublic(pathname) || !isProtected(pathname)) {
    return NextResponse.next()
  }

  // Authenticate user
  const user = await stackServerApp.getUser({ tokenStore: request }).catch(() => null)

  // Redirect to signin if no user
  if (!user) {
    console.warn("[proxy] Blocked unauthenticated request", { pathname })
    const redirectUrl = new URL("/signin", request.url)
    redirectUrl.searchParams.set("after_auth_return_to", nextUrl.pathname + nextUrl.search)
    return NextResponse.redirect(redirectUrl)
  }

  // If accessing a team route, ensure user has access to that team
  if (pathname.startsWith("/team/")) {
    const teamIdFromUrl = pathname.split("/")[2] // extract UUID
    const userTeamId = user?.selectedTeam?.id

    if (!userTeamId || userTeamId !== teamIdFromUrl) {
      console.warn("[proxy] Access denied to another team", { pathname, userTeamId })
      const redirectUrl = new URL(`/team/${userTeamId}/dashboard`, request.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Set auth headers
  const newHeaders = new Headers(request.headers)
  newHeaders.delete("x-facein-user-id")
  newHeaders.delete("x-facein-user-email")
  newHeaders.delete("x-facein-team-id")
  newHeaders.delete("x-facein-authenticated")

  newHeaders.set("x-facein-user-id", user.id)
  if (user.primaryEmail) {
    newHeaders.set("x-facein-user-email", user.primaryEmail)
  }
  if (user.selectedTeam) {
    newHeaders.set("x-facein-team-id", user.selectedTeam.id)
  }
  newHeaders.set("x-facein-authenticated", "true")

  return NextResponse.next({
    request: { headers: newHeaders },
  })
}
