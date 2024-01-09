import { useState } from "react"
import { cn } from "@/utils"
import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "./ui/button"
import { CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"

interface IFormInput {
  name: string
  email: string
}

const schema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "any.required": "Name is required",
  }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.email": "Email is invalid",
      "any.required": "Email is required",
    }),
})

const Invite = ({ className }: React.ComponentProps<"form">) => {
  const [loading, setLoading] = useState<boolean>(false)
  const form = useForm<IFormInput>({
    resolver: joiResolver(schema),
  })

  const onSubmit: SubmitHandler<IFormInput> = async () => {
    setLoading(true)
    try {
      // const { data } = await axios.post(
      //   `${process.env.API_URL}/vendor/login`,
      //   val
      // );
      // console.log(data);
      // dispatch(
      //   setLogin({
      //     vendor: data.data.name,
      //     v_id: data.data._id,
      //     token: data.data.token,
      //   })
      // );
    } catch (error) {
      toast.error("Unable to send Invite!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={cn("grid items-start max-sm:px-4", className)}>
      <CardHeader className="mb-4">
        <CardTitle className="text-white">Send Invite</CardTitle>
        <CardDescription>Invite your friend/clients and get rewards!</CardDescription>
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
          <Button type="submit" className="w-full" disabled={loading}>
            Send Invite
          </Button>
        </form>
      </Form>
    </section>
  )
}

export default Invite
