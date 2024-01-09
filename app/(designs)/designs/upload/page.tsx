"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { TAGS } from "@/utils/dummy"
import { UploadDropzone } from "@/utils/uploadthing"
import { joiResolver } from "@hookform/resolvers/joi"
import axios from "axios"
import Joi from "joi"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface IFormInput {
  description: string
  shotUrl: string
  tags: string[]
  title: string
}

const schema = Joi.object({
  description: Joi.string().min(200).max(1000).required().messages({
    "string.empty": `Description cannot be empty`,
    "any.required": `Please provide a description for your shot. It will be used as the description of the shot.`,
    "string.min": `Description should have a minimum length of {#limit}`,
    "string.max": `Description should have a maximum length of {#limit}`,
  }),
  shotUrl: Joi.string().required().messages({
    "string.empty": `Shot Url cannot be empty`,
    "any.required": `Please provide a url for your shot. It will be used as the image of the shot.`,
  }),
  title: Joi.string().required().messages({
    "string.empty": `Title cannot be empty`,
    "any.required": `Please provide a title for your shot. It will be used as the title of the shot.`,
  }),
  tags: Joi.array().items(Joi.string()).required().messages({
    "any.required": `Please provide a tags for your shot. It will be used as the tags of the shot.`,
  }),
})

const Upload = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const form = useForm<IFormInput>({
    resolver: joiResolver(schema),
  })

  const onSubmit: SubmitHandler<IFormInput> = async (val) => {
    setLoading(true)
    toast.info("Uploading Shot...")
    try {
      const { data } = await axios.post("/api/shots", {
        role: "vendor",
        description: val.description,
        images: {
          title: "Hotel Room",
          url: val.shotUrl,
        },
        tags: val.tags,
        category: "Furniture",
        title: val.title,
        owner: localStorage.getItem("v_id"),
      })
      if (!data) {
        return
      }
      toast.success("Shot uploaded successfully")
      router.push(`/designs/${data.shot._id}`)
    } catch (error) {
      toast.error("Shot upload failed")
    } finally {
      setLoading(false)
    }
  }

  function addTags(tag: string, tags: string[]) {
    if (tags) {
      return [...tags, tag]
    } else {
      return [tag]
    }
  }

  return (
    <>
      <h1 className="mt-2 text-center">What have you been working on?</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea rows={12} placeholder="Tell us a little bit about your shot" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-muted-foreground">Upload Shot</p>
          <UploadDropzone
            endpoint="imageUploader"
            className="h-60 w-full rounded bg-background px-4 text-muted-foreground"
            onClientUploadComplete={(res) => {
              form.setValue("shotUrl", res[0].url)
              setLoading(false)
            }}
            onUploadBegin={() => {
              setLoading(true)
            }}
            onUploadError={(error: Error) => {
              toast.error(error.message)
            }}
            config={{
              mode: "auto",
            }}
          />
          <FormField
            control={form.control}
            name="tags"
            render={() => (
              <FormItem>
                <FormLabel className="mb-2 text-base">Tags</FormLabel>
                <div className="flex gap-2">
                  {TAGS.map((tag) => (
                    <FormField
                      key={tag.id}
                      control={form.control}
                      name="tags"
                      render={({ field }) => {
                        return (
                          <FormItem key={tag.id} className="flex items-start space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(tag.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange(addTags(tag.id, field.value))
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
            Upload Shot
          </Button>
        </form>
      </Form>
    </>
  )
}

export default Upload
