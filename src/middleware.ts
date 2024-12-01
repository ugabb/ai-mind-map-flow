import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { cookieValues, isProduction, productionCookieToken } from "./services/axios";



export function middleware(request: NextRequest) {
  const myCookie = cookies();

  let token: string | null = null;
  if (myCookie.get(isProduction ? productionCookieToken : cookieValues.token)) {
    token = myCookie.get(isProduction ? productionCookieToken : cookieValues.token)!.value;
  }
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ['/home', '/mind-map/:path*', '/profile'],
};
