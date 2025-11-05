import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/attendance/:path*",
    "/employees/:path*",
    "/payroll/:path*",
    "/settings/:path*",
    "/kiosk/:path*",
  ],
}

export function proxy(request: NextRequest) {
  const userId = request.headers.get("x-user-id")

  if (!userId) {
    const url = request.nextUrl.clone()
    url.pathname = "/signin"
    url.searchParams.set("after_auth_return_to", request.nextUrl.pathname + request.nextUrl.search)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
