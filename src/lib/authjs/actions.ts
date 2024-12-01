import { LoginFormValues } from "@/app/(auth)/login/page";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export const googleLogin = async () => {
    await signIn("google", {
        redirectTo: "/home",
        redirect: true
    });
}
export const credentialsSignIn = async (data: LoginFormValues) => {
    try {
      // Attempt to sign in using NextAuth credentials provider
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        redirectTo: "/home",
      });

      if (response?.error) {
        if (response.error.includes("CredentialsSignin")) {
          toast.error("Incorrect email or password. Please try again.");
        } else {
          toast.error(`Login failed: ${response.error}`);
        }
        return { success: false, message: response.error };
      }
  
      // Success case
      if (response?.ok) {
        toast.success("Login successful!");
        
        return { success: true };
      }
  
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred during login. Please try again.");
      return { success: false, message: (error as Error).message };
    }
  };
