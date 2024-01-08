"use client"

import { useState } from "react"
import { useAppDispatch } from "@/context/hook"
import { cn } from "@/utils"
import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import { vendorLogin } from "@/lib/actions/vendor.actions"
import { Button } from "@/components/ui/button"
import { Input, PasswordInput } from "@/components/ui/input"

import { setLogin, togglePanel } from "../context/theme"
import { CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"

interface IFormInput {
  email: string
  password: string
}

const schema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.email": "Email is invalid",
      "any.required": "Email is required",
    }),
  password: Joi.string().min(3).required().messages({
    "any.required": "Password is required",
    "string.min": "Password must be at least 3 characters",
  }),
})

export default function SignInForm({ className }: React.ComponentProps<"form">) {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm<IFormInput>({
    resolver: joiResolver(schema),
  })

  const onSubmit: SubmitHandler<IFormInput> = async (val) => {
    setLoading(true)

    try {
      const data = await vendorLogin(val)
      if (data.error) {
        return toast.error(data.error)
      }
      console.log(data)
      dispatch(
        setLogin({
          vendor: data.name,
          v_id: data._id,
          token: data.token,
          profilePic: data.profilePic,
        })
      )
      dispatch(togglePanel("HIDE"))
      toast.success("Login successful")
    } catch (error) {
      toast.error("Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={cn("grid items-start max-sm:px-4", className)}>
      <CardHeader className="mb-4">
        <CardTitle className="text-white">Sign in</CardTitle>
        <CardDescription>Get inspire and share inspirations</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="hello@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput autoComplete="true" placeholder="enter password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            Sign In
          </Button>
        </form>
      </Form>
    </section>
  )
}
