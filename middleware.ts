import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (!path.startsWith("/admin") && !path.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const hasSessionCookie =
    Boolean(req.cookies.get("ayojit_session")?.value) ||
    Boolean(req.cookies.get("auth_token")?.value);

  if (!hasSessionCookie) {
    return NextResponse.redirect(new URL("/login?error=SessionRequired", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
