"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { joiResolver } from "@hookform/resolvers/joi"
import axios from "axios"
import Joi from "joi"
import { SubmitHandler, useForm } from "react-hook-form"

import { Icons } from "@/components/Icons"

interface IFormInput {
  description: string
  shotUrl: string
  minimal: boolean
  luxurious: boolean
  spaceSaving: boolean
  title: string
}

const schema = Joi.object({
  description: Joi.string().min(200).max(800).required().messages({
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
  minimal: Joi.boolean(),
  luxurious: Joi.boolean(),
  spaceSaving: Joi.boolean(),
})

const Upload = () => {
  const router = useRouter()
  const [message, setMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: joiResolver(schema),
  })

  const onSubmit: SubmitHandler<IFormInput> = async (val) => {
    setLoading(true)
    setMessage("Uploading...")
    const tags = []
    if (val.minimal) tags.push("Minimal")
    if (val.luxurious) tags.push("Luxurious")
    if (val.spaceSaving) tags.push("Space Saving")

    try {
      const { data } = await axios.post("/api/shots", {
        role: "vendor",
        description: val.description,
        images: {
          title: "Hotel Room",
          url: val.shotUrl,
        },
        tags,
        category: "Furniture",
        title: val.title,
        owner: localStorage.getItem("v_id"),
      })
      if (!data) {
        setMessage("Some Error!")
        return
      }
      setMessage("Uploaded Successfully: Redirecting to shot!")
      router.push(`/designs/${data.shot._id}`)
    } catch (error) {
      setMessage("Some Error!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Link href="/designs" className="bg-trans block w-full px-4 py-2 text-center ">
        Cancel !
      </Link>
      <header className="my-4 text-center">
        <h1>What have you been working on?</h1>
        {message && <h1 className="fixed left-1/2 top-5">{message}</h1>}
      </header>
      <form className="text-gray flex flex-col  gap-4 py-8" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" id="title" className="bg-dark rounded p-4" placeholder="Add the title here..." {...register("title")} />
        <span className="mt-1 text-xs text-red-400">{errors.title?.message}</span>
        <input type="text" id="shotUrl" className="bg-dark rounded p-4" placeholder="Add the url here..." {...register("shotUrl")} />
        <span className="mt-1 text-xs text-red-400">{errors.shotUrl?.message}</span>
        <textarea
          {...register("description")}
          className="bg-dark rounded p-4"
          id="description"
          cols={30}
          rows={10}
          placeholder="Add the description here..."
        />
        <span className="mt-1 text-xs text-red-400">{errors.description?.message}</span>
        <label htmlFor="shot">Select the tags</label>
        <div className="flex flex-row gap-4">
          <input type="checkbox" id="minimal" {...register("minimal")} className="bg-dark rounded p-4" />
          <label htmlFor="minimal">Minimal</label>
          <input type="checkbox" id="luxurious" {...register("luxurious")} className="bg-dark rounded p-4" />
          <label htmlFor="luxurious">Luxurious</label>
          <input type="checkbox" id="spaceSaving" {...register("spaceSaving")} className="bg-dark rounded p-4" />
          <label htmlFor="luxurious">Space Saving</label>
        </div>

        <button disabled={loading} className="mt-4 rounded bg-primary p-2 text-center">
          Upload {loading && <Icons.Loading />}
        </button>
      </form>
    </>
  )
}

export default Upload
