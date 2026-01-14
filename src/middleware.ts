import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "./utils/auth";

const authRoutes = ["/signin", "/signup"];
const userRoutes = ["/home", "/books", "/library"];
const adminRoutes = ["/dashboard", "/books", "/categories", "/users", "/reviews"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = (await cookies()).get("token")?.value;
  const tokenPayload = decodeToken(token);

  // 1. Handle Unauthenticated Users
  if (!tokenPayload) {
    if (authRoutes.includes(pathname)) return NextResponse.next();
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // 2. Handle Root Path ("/") and Auth Routes for Authenticated Users
  // Redirect to role-specific default home
  if (pathname === "/" || authRoutes.includes(pathname)) {
    const roleHome = tokenPayload.role === "admin" ? "/dashboard" : "/home";
    return NextResponse.redirect(new URL(roleHome, request.url));
  }

  // 3. Role-Based Access Control (RBAC)
  const role = tokenPayload.role;
  const allowedPaths = role === "admin" ? adminRoutes : userRoutes;

  // Check if current path is in the allowed list
  // The logic handles exact matches and dynamic routes like /books/[id]
  const isAllowed =
    allowedPaths.includes(pathname) ||
    (pathname.startsWith("/books/") && allowedPaths.includes("/books"));

  if (!isAllowed) {
    // Rewrite to 404 so the user stays on the URL but sees the custom Not Found page
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};