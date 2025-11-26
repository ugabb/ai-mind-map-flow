"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner8 } from "react-icons/im";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/authClient";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/home",
      rememberMe: true,
    });
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/home`,
    });
  };

  return (
    <div className="p-5">
      <div className="mb-5">
        <h1 className="font-bold text-3xl">Login</h1>
        <p className="text-base text-muted-foreground">
          Welcome! Enter your e-mail
        </p>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>E-mail</FormLabel>
                <FormControl>
                  <div className="flex flex-col">
                    <Input
                      {...field}
                      className={cn({
                        "border-red-500 focus-visible:ring-red-500":
                          form.formState.errors.password,
                      })}
                      placeholder="E-mail"
                      type="email"
                    />
                    {form.formState.errors.email && (
                      <p className="text-destructive text-xs">
                        {form.formState.errors.email?.message}
                      </p>
                    )}
                  </div>
                </FormControl>
                <FormDescription>Enter your e-mail</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Password</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-1">
                    <Input
                      {...field}
                      className={cn({
                        "border-red-500 focus-visible:ring-red-500":
                          form.formState.errors.password,
                      })}
                      placeholder="Password"
                      type="password"
                    />
                    {form.formState.errors.password && (
                      <p className="text-destructive text-xs">
                        {form.formState.errors.password?.message}
                      </p>
                    )}
                  </div>
                </FormControl>
                <FormDescription>Enter your password</FormDescription>
              </FormItem>
            )}
          />
          <div className="flex w-full flex-col items-center justify-center gap-1">
            <Button
              className="w-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
              disabled={form.formState.isSubmitting}
              type="submit"
            >
              {form.formState.isSubmitting ? (
                <ImSpinner8 className="size-5 animate-spin text-primary-foreground" />
              ) : (
                "Sign In"
              )}
            </Button>
            <div className="space-x-2">
              <span className="text-muted-foreground text-sm">
                Don&apos;t have an account?
              </span>
              <Link
                className="text-primary text-sm transition-all hover:underline"
                href={"/sign-up"}
              >
                Click here!
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <FcGoogle
              className="size-10 cursor-pointer"
              onClick={handleGoogleLogin}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
