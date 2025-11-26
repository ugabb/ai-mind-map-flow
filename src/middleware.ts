import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { authClient } from "@/lib/authClient";
import { getSessionCookie } from "better-auth/cookies";


const publicRoutes = ['/login', '/sign-up'];

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const isAuthenticated = !!sessionCookie;
  console.log('==== isAuthenticated', isAuthenticated);
  if(isAuthenticated && publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  // if(!isAuthenticated && publicRoutes.includes(request.nextUrl.pathname)) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  return NextResponse.next();
}

export const config = {
  runtime: "nodejs", // Required for auth.api calls
  matcher: [
    '/((?!api|trpc|.*\\..*|_next).*)',
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/',
  ],
};