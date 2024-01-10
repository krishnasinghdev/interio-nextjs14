"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { TAGS } from "@/utils/dummy"
import { joiResolver } from "@hookform/resolvers/joi"
import axios from "axios"
import Joi from "joi"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"

interface IFormInput {
  name: string
  profilePic: string
  email: string
  contact: number
  address: string
  biography: string
  workHistory: object
  lookingFor: object
  skills: string[]
}

const schema = Joi.object({
  name: Joi.string().max(50).required().messages({
    "string.max": "Name must be at most {#limit} characters long",
    "any.required": "Name is required",
  }),
  profilePic: Joi.string(),
  contact: Joi.string().min(8).max(12).messages({
    "string.min": "Contact number should be atleast 8 digitd",
    "string.max": "Name must be at most 12 digits long",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
  address: Joi.string(),
  biography: Joi.string().max(500).messages({
    "string.max": "Bio must be at most {#limit} characters long",
  }),
  skills: Joi.array().items(Joi.string()).min(1).required().messages({
    "any.required": "Select atleast 1 skill.",
    "array.min": "Select atleast 1 skill.",
  }),
  // workHistory: Joi.array().items({
  //   title: Joi.string(),
  //   company: Joi.string(),
  //   location: Joi.string(),
  //   from: Joi.string(),
  //   to: Joi.string(),
  // }),
  // lookingFor: Joi.array().items({
  //   title: Joi.string(),
  //   location: Joi.string(),
  // }),
})

const Edit = () => {
  const [vendor, setVendor] = useState<IFormInput>()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const form = useForm<IFormInput>({
    resolver: joiResolver(schema),
    defaultValues: vendor,
  })

  const getVendor = async () => {
    try {
      const data = await axios.get(`/api/vendor`)
      if (data.status !== 200) throw new Error("Something went wrong")
      const vendor = data.data
      setVendor(vendor)
      if (vendor) {
        form.setValue("name", vendor.name)
        form.setValue("address", vendor.address)
        form.setValue("email", vendor.email)
        form.setValue("skills", vendor.skills)
        // form.setValue("workHistory", vendor.workHistory)
        // form.setValue("lookingFor", vendor.lookingFor)
        // vendor.contact && form.setValue("contact", vendor.contact)
        // vendor.biography && form.setValue("biography", vendor.biography)
        // vendor.profilePic && form.setValue("profilePic", vendor.profilePic)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getVendor()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit: SubmitHandler<IFormInput> = async (val) => {
    setLoading(true)
    try {
      // val.skills.filter((value) => value !== "")
      // remove repeated skills

      val.skills = val.skills.filter((skill, index) => {
        return val.skills.indexOf(skill) === index
      })

      const data = await axios.post(`/api/vendor`, val)
      console.log(data)
      toast.success("Profile updated successful")
      router.push("/profile")
    } catch (error) {
      toast.error("Update failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative -mt-16 flex  items-center justify-between rounded bg-secondary/80 p-2 px-4 text-white md:-mt-24">
            <div className="flex items-center gap-4">
              <Image
                src={form.getValues("profilePic") || "/user.png"}
                alt="user"
                width={80}
                height={80}
                className="h-12 w-12 rounded-full md:h-20 md:w-20"
              />
              <Icons.Edit size={24} />
            </div>
            <Link
              className={buttonVariants({
                variant: "outline",
              })}
              href={"/profile"}
            >
              Cancel Edit
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="name" {...field} defaultValue={vendor?.name} />
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
                    <Input type="email" {...field} defaultValue={vendor?.email} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} defaultValue={vendor?.contact} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea {...field} defaultValue={vendor?.address} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="biography"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Biography</FormLabel>
                <FormControl>
                  <Textarea {...field} defaultValue={vendor?.biography} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="skills"
            render={() => (
              <FormItem>
                <FormLabel className="mb-2 text-base">Skills</FormLabel>
                <div className="flex gap-2">
                  {TAGS.map((tag) => (
                    <FormField
                      key={tag.id}
                      control={form.control}
                      name="skills"
                      render={({ field }) => {
                        return (
                          <FormItem key={tag.id} className="flex items-start space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(tag.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange(addSkill(tag.id, field.value))
                                    : field.onChange(field.value?.filter((value) => value !== tag.id))
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{tag.label}</FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            Save
          </Button>
        </form>
      </Form>
    </>
  )
}

export default Edit

function addSkill(tag: string, tags: string[]) {
  if (tags) {
    return [...tags, tag]
  } else {
    return [tag]
  }
}
