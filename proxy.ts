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
  return PROTECTED_PATHS.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
}

export async function proxy(request: NextRequest) {
  const { nextUrl, method } = request
  const pathname = nextUrl.pathname

  // Skip preflight & public
  if (method === "OPTIONS" || isPublic(pathname) || !isProtected(pathname)) {
    return NextResponse.next()
  }

  // Authenticate user
  const user = await stackServerApp.getUser({ tokenStore: request }).catch(() => null)

  // Redirect to signin if no user
  if (!user) {
    const redirectUrl = new URL("/signin", request.url)
    redirectUrl.searchParams.set("after_auth_return_to", nextUrl.pathname + nextUrl.search)
    return NextResponse.redirect(redirectUrl)
  }

  // Set auth headers
  const newHeaders = new Headers(request.headers)
  newHeaders.set("x-facein-user-id", user.id)
  newHeaders.set("x-facein-user-email", user.primaryEmail ?? "")
  newHeaders.set("x-facein-authenticated", "true")

  return NextResponse.next({
    request: { headers: newHeaders },
  })
}
