"use client";
import React from "react";

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
import { useRouter } from "next/navigation";
import { ImSpinner8 } from "react-icons/im";
import { useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { googleLogin } from "@/lib/authjs/actions";
import { handleUploadProfilePicture } from "@/services/user/uploadProfilePicture";
import toast from "react-hot-toast";
import { registerUser } from "@/services/user/registerUser";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  name: z.string(),
  profilePicture: z.instanceof(File).optional(),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: SignUpFormValues) => {
    let profilePictureURL = "";
    if (data.profilePicture) {
      profilePictureURL = await handleUploadProfilePicture(data.profilePicture);
    }

    const { status, message } = await registerUser({
      email: data.email,
      password: data.password,
      name: data.name,
      ...(profilePictureURL && { profilePicture: profilePictureURL }),
    });
    if (status === 201) {
      toast.success("Account created successfully");
      router.push("/login");
    }
    if(status === 400) {
      toast.error("Error creating account: " + message);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setError(null); // Reset any existing errors
    form.setValue("profilePicture", undefined);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0]; // Assuming a single file upload
      if (file.type.startsWith("image/")) {
        const objectUrl = URL.createObjectURL(file); // Create a preview URL for the image
        setPreview(objectUrl); // Set preview
        console.log(file);
        form.setValue("profilePicture", file); // Set the file in the form
      } else {
        setError("Please drop an image file (e.g., .jpg, .png)"); // Handle non-image files
        setPreview(null); // Clear any previous preview
      }
    }
  }, []);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null); // Reset any existing errors
    form.setValue("profilePicture", undefined); // Reset the file in the form
    console.log(event.target.files);

    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const objectUrl = URL.createObjectURL(file); // Create a URL for preview
        setPreview(objectUrl); // Set the preview
        form.setValue("profilePicture", file); // Set the file in the form
      } else {
        setError("Please select an image file (e.g., .jpg, .png)");
        setPreview(null);
      }
    }
  };

  const handleRemove = () => {
    setPreview(null); // Remove preview
  };

  return (
    <div className="px-5 py-20 min-w-[533px]">
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

          <FormField
            control={form.control}
            name="profilePicture"
            render={({ field }) => (
              <FormItem className="w-full">
                {!preview ? (
                  <>
                    <FormLabel htmlFor={field.name}>Drop your photo</FormLabel>
                    <FormControl className="flex justify-center items-center h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                      <Input
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onChange={handleFileSelect}
                        placeholder="drop your profile photo"
                        type="file"
                        className={`${
                          form.formState?.errors?.confirmPassword &&
                          "border border-red-500"
                        } w-full`}
                        accept="image/*"
                      />
                    </FormControl>
                    {form.formState?.errors?.confirmPassword ? (
                      <FormMessage>
                        {form.formState.errors.confirmPassword?.message}
                      </FormMessage>
                    ) : (
                      <FormDescription></FormDescription>
                    )}
                  </>
                ) : (
                  <div className="relative h-48 w-48">
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-48 w-48 object-cover rounded-full"
                    />
                    <button
                      onClick={handleRemove}
                      className="absolute w-5 h-5 top-0 right-0 p-2 bg-red-600 text-white rounded-full flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </div>
                )}
              </FormItem>
            )}
          />

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
