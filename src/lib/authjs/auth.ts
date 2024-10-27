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

          return user; // Return the custom User object with new fields
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
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  session: { strategy: 'jwt' },
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
    redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.image = user.image;
        token.createdAt = (user as ExtendedUser).createdAt;
        token.updatedAt = (user as ExtendedUser).updatedAt;
      }
      return token;
    },
    async session({ session, user, token }) {
      session.user.id = token.id as string;
      session.user.image = token.image as string | null;
      session.user.createdAt = new Date(token.createdAt as string);
      session.user.updatedAt = new Date(token.updatedAt as string);
      return session;
    }
  },
});
