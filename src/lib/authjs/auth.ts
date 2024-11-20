import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import * as jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import { cookieValues } from "@/services/axios";

const isProduction = process.env.NODE_ENV === "production";
const productionCookieToken = '__Secure-' + cookieValues.token;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },
      authorize: async (credentials) => {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/user/authenticate`,
            credentials
          );

          const user = {
            name: data.user.name,
            id: data.user.id,
            email: data.user.email,
            image: data.user.profilePicture,
            createdAt: new Date(data.user.createdAt),
            updatedAt: new Date(data.user.updatedAt),
          };

          return user;
        } catch (err) {
          // Check if the error is due to invalid credentials
          if (axios.isAxiosError(err) && err.response && err.response.status === 400) {
            console.log("Invalid credentials:", err.response.data.message);
            throw new Error("Invalid credentials");
          }

          // Handle other error cases (e.g. network issues, server errors)
          const error = err as any;
          console.log("Authentication error:", error.response?.data?.message || error.message);
          throw new Error("Authentication failed. Please try again later.");
        }
      },
    }),
  ],
  debug: true,
  pages: {
    signIn: "/login",
    error: "/error",
  },
  cookies: {
    sessionToken: {
      name: isProduction ? productionCookieToken : cookieValues.token,
      options: {
        httpOnly: true,
        secure: isProduction,
        path: '/',
        sameSite: 'lax',
      },
    },
  },
  secret: process.env.AUTH_SECRET,
  session: { strategy: 'jwt' },
  jwt: {
    encode: async ({ secret, token, maxAge }) => {
      const jwtClaims = {
        id: token?.id,
        sub: token?.id ? token.id.toString() : token?.email || "",
        name: token?.name,
        email: token?.email,
        image: token?.image,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (maxAge || 60 * 60 * 24 * 7), // 7 days
        aud: 'urn:next-auth',
        iss: 'urn:next-auth',
      };
      const encodedToken = jwt.sign(jwtClaims, secret as string);
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      try {
        const decodedToken = jwt.verify(token as string, secret as string) as jwt.JwtPayload;
        return {
          ...decodedToken,
          id: decodedToken.id,
          name: decodedToken.name,
          email: decodedToken.email,
          image: decodedToken.image,
        };
      } catch (error) {
        console.error("Token decode error:", error);
        return null;
      }
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/user/google-authenticate`,
            {
              email: user.email,
              name: user.name,
              profilePicture: user.image,
              googleId: account?.providerAccountId,
            }
          );

          const userData = response?.data?.user;
          user.id = userData?.id

          return response.status === 200;
        } catch (error) {
          console.error('Error during Google sign-in:', error);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.image = user.image;
        token.createdAt = user.createdAt;
        token.updatedAt = user.updatedAt;
      }
      return token;
    },
    async session({ session, user, token }) {
      session.user.id = token.id as string;
      session.user.image = token.image as string | null;
      session.user.createdAt = new Date(token.createdAt as string);
      session.user.updatedAt = new Date(token.updatedAt as string);
      session.user.token = cookies().get(isProduction ? productionCookieToken : cookieValues.token) as { name: string, value: string };
      return session;
    }
  },
});
