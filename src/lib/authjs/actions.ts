import { LoginFormValues } from "@/app/(auth)/login/page";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export const googleLogin = async () => {
    await signIn("google", {
        callbackUrl: "/home",
    });
}
export const credentialsSignIn = async (data: LoginFormValues) => {
   const response =  await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
   });

   return response
}