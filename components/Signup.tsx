"use client"

import { useState } from "react"
import { useAppDispatch } from "@/context/hook"
import { cn } from "@/utils"
import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import { addVendor } from "@/lib/actions/vendor.actions"
import { Button } from "@/components/ui/button"
import { Input, PasswordInput } from "@/components/ui/input"

import { setLogin, togglePanel } from "../context/theme"
import { CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"

interface IFormInput {
  name: string
  email: string
  password: string
  cpassword: string
}

const schema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "any.required": "Email is required",
      "string.email": "Email is invalid",
    }),
  password: Joi.string().min(3).required().messages({
    "any.required": "Password is required",
    "string.min": "Password must be at least 3 characters",
  }),
  cpassword: Joi.ref("password"),
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
})

export default function SignUpForm({ className }: React.ComponentProps<"form">) {
  const dispatch = useAppDispatch()
  const form = useForm<IFormInput>({
    resolver: joiResolver(schema),
  })
  const [loading, setLoading] = useState(false)
  const onSubmit: SubmitHandler<IFormInput> = async (val) => {
    setLoading(true)
    try {
      //@ts-ignore - cpassword is not optional
      delete val.cpassword
      const data = await addVendor(val)
      if (data.error) {
        return toast.error(data.error)
      }
      dispatch(
        setLogin({
          vendor: data.name,
          v_id: data._id,
          token: data.token,
        })
      )
      dispatch(togglePanel('HIDE'))
      toast.success("Account Created!")
    } catch (error: any) {
      toast.error("Something went wrong", error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={cn("grid items-start", className)}>
      <CardHeader className="mb-4">
        <CardTitle className="text-white">Sign Up</CardTitle>
        <CardDescription>Create accoun to get inspirations</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="cpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                <PasswordInput autoComplete="true" placeholder="confirm password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4 w-full" disabled={loading}>
            Sign Up
          </Button>
        </form>
      </Form>
    </section>
  )
}
