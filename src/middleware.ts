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

  // 1. Not Logged In
  if (!tokenPayload) {
    if (authRoutes.includes(pathname)) return NextResponse.next();
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // 2. Logged In: Trying to access Signin/Signup
  if (authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3. Logged In: Role-Based Access Control
  const role = tokenPayload.role;
  const allowedPaths = role === "admin" ? adminRoutes : userRoutes;

  // Check if current path is in the allowed list
  // The second check handles dynamic routes like /books/[id]
  const isAllowed =
    allowedPaths.includes(pathname) ||
    (pathname.startsWith("/books/") && allowedPaths.includes("/books"));

  if (!isAllowed) {
    // Rewrite to 404 so the user stays on the URL but sees "Not Found"
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
