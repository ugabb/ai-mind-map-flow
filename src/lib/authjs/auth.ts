import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

// Extending the NextAuth User interface
export type ExtendedUser = DefaultSession['user'] & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}

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
        console.log(credentials);
        try {
          const { status, data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/user/authenticate`,
            credentials
          );

          if (status === 200) {
            console.log("Login successful!");
          }

          const user = {
            name: data.user.name,
            id: data.user._id,
            email: data.user.email,
            image: data.user.profilePicture,
            createdAt: new Date(data.user.createdAt),
            updatedAt: new Date(data.user.updatedAt),
          };

          return user; // Return the custom User object with new fields
        } catch (err) {
          console.log(err);
          return null; // Handle the case where the login fails
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt({ token, user }) {
      console.log("jwt", token, user);
      if (user) {
        token.id = user.id;
        token.image = user.image ;
        token.createdAt = (user as ExtendedUser).createdAt;
        token.updatedAt = (user as ExtendedUser).updatedAt;
      }
      return token;
    },
    async session({ session, user, token }) {
      console.log("session", session, "user", user, "token", token);
      session.user.id = token.id as string;
      session.user.image = token.image as string | null;
      session.user.createdAt = new Date(token.createdAt as string);
      session.user.updatedAt = new Date(token.updatedAt as string);
      return session;
    },
  },
});
