import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { cookieValues, isProduction, productionCookieToken } from "./services/axios";


const loggedInRoutes = ["/home", '/mind-map' ,'/profile'];
const loggedOutRoutes = ["/login", "/sign-up"];

const BASE_URL = process.env.NEXT_PUBLIC_URL;

export default async function AuthMiddleware(
  req: NextRequest
): Promise<NextResponse> {
  if (
    !loggedInRoutes.some((path) =>
      req.nextUrl.pathname.startsWith(path)) &&
    !loggedOutRoutes.some((path) => req.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.next();
  } else {
    const myCookie = cookies();

    let token: string | null = null;
    if (myCookie.get(isProduction ? productionCookieToken : cookieValues.token)) {
      token = myCookie.get(isProduction ? productionCookieToken : cookieValues.token)!.value;
    }

    if (
      !token &&
      loggedInRoutes.some((path) => req.nextUrl.pathname.startsWith(path))
    ) {
      const loginUrl = new URL('/login', req.url)
      return NextResponse.redirect(loginUrl);
    } else if (
      token &&
      loggedOutRoutes.some((path) => req.nextUrl.pathname.startsWith(path))
    ) {
      const homeUrl = new URL('/login', req.url)
      return NextResponse.redirect(homeUrl);
    }
  }

  return NextResponse.next();
}
