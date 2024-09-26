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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormValues) => {
    console.log(data);
  };

  return (
    <div className="p-5">
      <div className="mb-5">
        <h1 className="text-3xl font-bold">Sign Up</h1>
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
                  <Input {...field} placeholder="E-mail" type="email" />
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
                  <Input {...field} placeholder="Password" type="password" />
                </FormControl>
                <FormDescription>Enter your password</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>
                  Confirm your password
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Password" type="password" />
                </FormControl>
                <FormDescription>Enter your password</FormDescription>
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-1 justify-center items-center w-full">
            <Button
              type="submit"
              className="bg-indigo-500 text-zinc-200 font-semibold hover:bg-indigo-600 w-full"
            >
              Sign Up
            </Button>
            <div className="space-x-2">
              <span className="text-sm text-zinc-600">
                Already have an account?
              </span>
              <Link
                href={"/login"}
                className="text-sm text-indigo-500 hover:underline transition-all"
              >
                Click here!
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
