import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {

    interface Session {
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            token?: {
                name: string
                value: string
            }
        } & DefaultSession["user"]
    }

    interface User extends DefaultSession["user"] {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        token?: {
            name: string
            value: string
        }
    }
}
