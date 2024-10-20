import { signIn } from "next-auth/react";

export const googleLogin = async () => {
    await signIn("google", {
        callbackUrl: "/home",
    });
}