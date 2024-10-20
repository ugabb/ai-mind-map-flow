
import NextAuth, { type DefaultSession } from "next-auth"
import Google from "next-auth/providers/google"

declare module "next-auth" {
  interface Session {
    user: {
      address: string
    } & DefaultSession["user"]
  }
}
 
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
})