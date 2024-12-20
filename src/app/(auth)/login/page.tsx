"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ImSpinner8 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { credentialsSignIn, googleLogin } from "@/lib/authjs/actions";
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

  const router = useRouter();

  const onSubmit = async (data: LoginFormValues) => {
    const result = await credentialsSignIn(data);
    if (result?.success) {
      router.push("/home"); // Redirect on success
    }
  };

  return (
    <div className="p-5">
      <div className="mb-5">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-base text-zinc-600">Welcome! Enter your e-mail</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
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
                      placeholder="E-mail"
                      type="email"
                      className={cn({
                        "border-red-500 focus-visible:ring-red-500":
                          form.formState.errors.password,
                      })}
                    />
                    {form.formState.errors.email && (
                      <p className="text-xs text-red-500">
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
                      placeholder="Password"
                      type="password"
                      className={cn({
                        "border-red-500 focus-visible:ring-red-500":
                          form.formState.errors.password,
                      })}
                    />
                    {form.formState.errors.password && (
                      <p className="text-xs text-red-500">
                        {form.formState.errors.password?.message}
                      </p>
                    )}
                  </div>
                </FormControl>
                <FormDescription>Enter your password</FormDescription>
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-1 justify-center items-center w-full">
            <Button
              type="submit"
              className="bg-indigo-500 text-zinc-200 font-semibold hover:bg-indigo-600 w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <ImSpinner8 className="size-5 text-indigo-100 animate-spin" />
              ) : (
                "Sign In"
              )}
            </Button>
            <div className="space-x-2">
              <span className="text-sm text-zinc-600">
                Don&apos;t have an account?
              </span>
              <Link
                href={"/sign-up"}
                className="text-sm text-indigo-500 hover:underline transition-all"
              >
                Click here!
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <FcGoogle
              onClick={googleLogin}
              className="size-10 cursor-pointer"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
