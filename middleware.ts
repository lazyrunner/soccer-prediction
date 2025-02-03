import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get("user_id");

  // Redirect to login if no user_id cookie is found
  if (!userCookie && !request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to all routes except static files
export const config = {
  matcher: ["/((?!api/login|_next/static|_next/image|favicon.ico|login).*)"],
};