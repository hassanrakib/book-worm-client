import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "./utils/auth";

const authRoutes = ["/signin", "/signup"];
const userRoutes = ["/", "/books", "/library"];
const adminRoutes = ["/", "/books", "/categories", "/users", "/reviews"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = (await cookies()).get("token")?.value;
  const tokenPayload = decodeToken(token);

  // 1. Unauthenticated
  if (!tokenPayload) {
    if (authRoutes.includes(pathname)) return NextResponse.next();
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // 2. Prevent Logged-in users from seeing Signin/Signup
  if (authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3. RBAC
  const role = tokenPayload.role;
  const allowedPaths = role === "admin" ? adminRoutes : userRoutes;

  const isAllowed =
    allowedPaths.includes(pathname) ||
    (pathname.startsWith("/books/") && allowedPaths.includes("/books"));

  if (!isAllowed) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
