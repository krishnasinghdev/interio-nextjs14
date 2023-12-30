"use client"

import { useState } from "react"
import { useAppDispatch } from "@/context/hook"
import { toggleModal, viewSignup } from "@/context/theme"
import { cn, useMediaQuery } from "@/utils"
import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"
import { SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { toast } from "sonner"

import { addVendor } from "@/lib/actions/vendor.actions"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"

import { setLogin } from "../context/theme"
import { CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"

export default function SignUpPanel() {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const dispatch = useAppDispatch()
  const VSI = useSelector(viewSignup)
  if (!VSI) return null

  if (isDesktop) {
    return (
      <Dialog open={VSI} onOpenChange={() => dispatch(toggleModal("HIDE"))}>
        <DialogContent className="sm:max-w-[425px]">
          <SignUpForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={VSI}>
      <DrawerContent className="pb-6">
        <SignUpForm className="px-4" />
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

const SignUpForm = ({ className }: React.ComponentProps<"form">) => {
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
      // console.log(data)

      dispatch(
        setLogin({
          vendor: data.name,
          v_id: data._id,
          token: data.token,
        })
      )
      toast.success("Account Created!")
    } catch (error) {
      toast.error("Something went wrong")
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
                  <Input type="password" autoComplete="true" placeholder="enter password" {...field} />
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
                  <Input type="cpassword" autoComplete="true" placeholder="enter password" {...field} />
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
