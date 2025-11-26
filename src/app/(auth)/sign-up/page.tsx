'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { ImSpinner8 } from 'react-icons/im'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/authClient'
import { handleUploadProfilePicture } from '@/services/user/uploadProfilePicture'

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  name: z.string(),
  profilePicture: z.instanceof(File).optional(),
})

export type SignUpFormValues = z.infer<typeof signUpSchema>

export default function SignUp() {
  const [preview, setPreview] = useState<string | null>(null)
  const [_error, setError] = useState<string | null>(null)

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  })

  const router = useRouter()

  const onSubmit = async (data: SignUpFormValues) => {
    let profilePictureURL = ''
    if (data.profilePicture) {
      profilePictureURL = await handleUploadProfilePicture(data.profilePicture)
    }

    const { data: response, error } = await authClient.signUp.email({
      email: data.email,
      name: data.name,
      password: data.password,
      image: profilePictureURL,
    })
    if (response?.user) {
      toast.success('Account created successfully')
      router.push('/login')
    }
    if (error) {
      toast.error(`Error creating account: ${error.message}`)
    }
  }

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      setError(null) // Reset any existing errors
      form.setValue('profilePicture', undefined)

      const files = event.dataTransfer.files
      if (files.length > 0) {
        const file = files[0] // Assuming a single file upload
        if (file.type.startsWith('image/')) {
          const objectUrl = URL.createObjectURL(file) // Create a preview URL for the image
          setPreview(objectUrl) // Set preview
          form.setValue('profilePicture', file) // Set the file in the form
        } else {
          setError('Please drop an image file (e.g., .jpg, .png)') // Handle non-image files
          setPreview(null) // Clear any previous preview
        }
      }
    },
    [form.setValue]
  )

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null) // Reset any existing errors
    form.setValue('profilePicture', undefined) // Reset the file in the form

    const files = event.target.files
    if (files && files.length > 0) {
      const file = files[0]
      if (file.type.startsWith('image/')) {
        const objectUrl = URL.createObjectURL(file) // Create a URL for preview
        setPreview(objectUrl) // Set the preview
        form.setValue('profilePicture', file) // Set the file in the form
      } else {
        setError('Please select an image file (e.g., .jpg, .png)')
        setPreview(null)
      }
    }
  }

  const handleRemove = () => {
    setPreview(null) // Remove preview
  }

  return (
    <div className="min-w-[533px] px-5 py-20">
      <div className="mb-5">
        <h1 className="font-bold text-3xl">Sign Up</h1>
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
          <div className="flex items-center gap-5">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor={field.name}>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={`${
                        form.formState?.errors?.password &&
                        'border border-red-500'
                      }`}
                      placeholder="Password"
                      type="password"
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
                      className={`${
                        form.formState?.errors?.confirmPassword &&
                        'border border-red-500'
                      } w-full`}
                      placeholder="Password"
                      type="password"
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
                {preview ? (
                  <div className="relative h-48 w-48">
                    <img
                      alt="Preview"
                      className="h-48 w-48 rounded-full object-cover"
                      src={preview}
                    />
                    <button
                      className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-destructive p-2 text-destructive-foreground"
                      onClick={handleRemove}
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <>
                    <FormLabel htmlFor={field.name}>Drop your photo</FormLabel>
                    <FormControl className="flex h-48 cursor-pointer items-center justify-center rounded-lg border-2 border-gray-300 border-dashed hover:border-gray-400">
                      <Input
                        accept="image/*"
                        className={`${
                          form.formState?.errors?.confirmPassword &&
                          'border border-red-500'
                        } w-full`}
                        onChange={handleFileSelect}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        placeholder="drop your profile photo"
                        type="file"
                      />
                    </FormControl>
                    {form.formState?.errors?.confirmPassword ? (
                      <FormMessage>
                        {form.formState.errors.confirmPassword?.message}
                      </FormMessage>
                    ) : (
                      <FormDescription />
                    )}
                  </>
                )}
              </FormItem>
            )}
          />

          <div className="flex w-full flex-col items-center justify-center gap-1">
            <Button
              className="flex w-full items-center gap-2 bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
              disabled={form.formState.isSubmitting}
              type="submit"
            >
              {form.formState.isSubmitting ? (
                <ImSpinner8 className="size-5 animate-spin text-primary-foreground" />
              ) : (
                'Sign Up'
              )}
            </Button>
            <div className="space-x-2">
              <span className="text-muted-foreground text-sm">
                Already have an account?
              </span>
              <Link
                className="text-primary text-sm transition-all hover:underline"
                href={'/login'}
              >
                Click here!
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <FcGoogle
              // onClick={googleLogin}
              className="size-10 cursor-pointer"
            />
          </div>
        </form>
      </Form>
    </div>
  )
}
