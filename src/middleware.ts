import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "./utils/auth";

const authRoutes = ["/signin", "/signup"];
const userRoutes = ["/home", "/books", "/my-library"];
const adminRoutes = [
  "/admin/dashboard",
  "/admin/manage-books",
  "/admin/manage-categories",
  "/admin/manage-users",
  "/admin/manage-reviews",
];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = (await cookies()).get("token")?.value;
  const tokenPayload = decodeToken(token);

  // 1. Unauthenticated: Redirect to signin unless already going to auth routes
  if (!tokenPayload) {
    if (authRoutes.includes(pathname)) return NextResponse.next();
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // 2. Handle Root Path ("/") Redirects based on role
  if (pathname === "/") {
    const roleHome =
      tokenPayload.role === "admin" ? "/admin/dashboard" : "/my-library";
    return NextResponse.redirect(new URL(roleHome, request.url));
  }

  // 3. Prevent Logged-in users from seeing Signin/Signup
  // Redirect them to their respective homes instead of "/" to avoid a double redirect
  if (authRoutes.includes(pathname)) {
    const roleHome =
      tokenPayload.role === "admin" ? "/admin/dashboard" : "/my-library";
    return NextResponse.redirect(new URL(roleHome, request.url));
  }

  // 4. Role-Based Access Control (RBAC)
  const role = tokenPayload.role;
  const allowedPaths = role === "admin" ? adminRoutes : userRoutes;

  // Check if current path is in the allowed list
  // Matches exact strings or dynamic book routes
  const isAllowed =
    allowedPaths.includes(pathname) ||
    (pathname.startsWith("/books/") && allowedPaths.includes("/books"));

  if (!isAllowed) {
    // If they are authenticated but the path isn't in their list, show 404
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
