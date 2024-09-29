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
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ImSpinner8 } from "react-icons/im";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  name: z.string(),
  profilePicture: z.string().optional(),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: SignUpFormValues) => {
    if (data.password !== data.confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      form.setError("password", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    const formData = {
      email: data.email,
      password: data.password,
      name: data.name,
      ...(data.profilePicture && { profilePicture: data.profilePicture }),
    };

    try {
      const { status } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user`,
        formData
      );

      if (status === 201) {
        toast.success("Sign Up successfully!");
        router.push("/login");
      }
    } catch (error) {
      toast.error("Errro while signing up");
      console.error(error);
    }
  };

  return (
    <div className="p-5 min-w-[533px]">
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Your name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" type="text" />
                </FormControl>
                <FormDescription>Enter your name</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>E-mail</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="johndoe@email.com"
                    type="email"
                  />
                </FormControl>
                <FormDescription>Enter your e-mail</FormDescription>
              </FormItem>
            )}
          />
          <div className="flex gap-5 items-center">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor={field.name}>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Password"
                      type="password"
                      className={`${
                        form.formState?.errors?.password &&
                        "border border-red-500"
                      }`}
                    />
                  </FormControl>
                  {form.formState?.errors?.password ? (
                    <FormMessage>
                      {form.formState.errors.password?.message}
                    </FormMessage>
                  ) : (
                    <FormDescription>Enter your password</FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor={field.name}>
                    Confirm your password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Password"
                      type="password"
                      className={`${
                        form.formState?.errors?.confirmPassword &&
                        "border border-red-500"
                      } w-full`}
                    />
                  </FormControl>
                  {form.formState?.errors?.confirmPassword ? (
                    <FormMessage>
                      {form.formState.errors.confirmPassword?.message}
                    </FormMessage>
                  ) : (
                    <FormDescription>Enter your password</FormDescription>
                  )}
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-1 justify-center items-center w-full">
            <Button
              type="submit"
              className="flex gap-2 items-center bg-indigo-500 text-zinc-200 font-semibold hover:bg-indigo-600 w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <ImSpinner8 className="size-5 text-indigo-100 animate-spin" />
              ) : (
                "Sign Up"
              )}
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
