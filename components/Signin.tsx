"use client"

import { useState } from "react"
import { useAppDispatch } from "@/context/hook"
import { toggleModal, viewSignin } from "@/context/theme"
import { cn, useMediaQuery } from "@/utils"
import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"
import { SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { toast } from "sonner"

import { vendorLogin } from "@/lib/actions/vendor.actions"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"

import { setLogin } from "../context/theme"
import { CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"

export default function SignInPanel() {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const dispatch = useAppDispatch()
  const VSI = useSelector(viewSignin)
  if (!VSI) return null

  if (isDesktop) {
    return (
      <Dialog open={VSI} onOpenChange={() => dispatch(toggleModal("HIDE"))}>
        <DialogContent className="sm:max-w-[425px]">
          <SigninForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={VSI}>
      <DrawerContent className="pb-6">
        <SigninForm className="px-4" />
        <DrawerFooter className="pt-4">
          <DrawerClose asChild>
            <Button variant="outline" onClick={() => dispatch(toggleModal("HIDE"))}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

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

const SigninForm = ({ className }: React.ComponentProps<"form">) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm<IFormInput>({
    resolver: joiResolver(schema),
  })

  const onSubmit: SubmitHandler<IFormInput> = async (val) => {
    setLoading(true)

    try {
      const data = await vendorLogin(val)
      dispatch(
        setLogin({
          vendor: data.name,
          v_id: data._id,
          token: data.token,
        })
      )
      toast.success("Login successful")
    } catch (error) {
      toast.error("Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={cn("grid items-start", className)}>
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
                  <Input type="password" autoComplete="true" placeholder="enter password" {...field} />
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
