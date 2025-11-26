import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/sign-up"];

// biome-ignore lint/suspicious/useAwait: <explanation>
export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const isAuthenticated = !!sessionCookie;
  console.log("==== isAuthenticated", isAuthenticated);
  if (isAuthenticated && publicRoutes.includes(request.nextUrl.pathname)) {
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
    "/((?!api|trpc|.*\\..*|_next).*)",
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/",
  ],
};
