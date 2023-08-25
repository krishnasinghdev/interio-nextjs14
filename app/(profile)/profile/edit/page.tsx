"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { toggleModal } from "@/context/theme"
import { joiResolver } from "@hookform/resolvers/joi"
import axios from "axios"
import Joi from "joi"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

interface IFormInput {
  name: string
  email: string
  location: string
  biography: string
  tag: string
  portfolio?: string
  username: string
}

const schema = Joi.object({
  name: Joi.string().max(50).required().messages({
    "string.max": "Name must be at most {#limit} characters long",
    "string.empty": "Name is required",
  }),
  username: Joi.string().max(50).required().messages({
    "string.max": "username must be at most {#limit} characters long",
    "string.empty": "Username is required",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
    }),
  location: Joi.string().required().messages({
    "string.empty": "Location is required",
  }),
  biography: Joi.string().max(500).required().messages({
    "string.max": "Bio must be at most {#limit} characters long",
    "string.empty": "Bio is required",
  }),
  tag: Joi.string().allow(""),
  portfolio: Joi.string().allow(""),
})

const Edit = () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState<string>("")
  const allTags = [
    "Modern",
    "Minimal",
    "Dark Theme",
    "Hotel Room",
    "Luxurious",
    "Space Saving",
  ]
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: joiResolver(schema),
  })

  useEffect(() => {
    const getVendor = async () => {
      try {
        const { data } = await axios.get(`${process.env.API_URL}/vendor`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        if (data?.data) {
          data?.data?.name && setValue("name", data?.data?.name)
          data?.data?.username && setValue("username", data?.data?.username)
          data?.data?.email && setValue("email", data?.data?.email)
          data?.data?.location && setValue("location", data?.data?.location)
          data?.data?.biography && setValue("biography", data?.data?.biography)
          data?.data?.tag && setValue("tag", data?.data?.tag)
          data?.data?.portfolio && setValue("portfolio", data?.data?.portfolio)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getVendor()
  }, [setValue])

  const onSubmit: SubmitHandler<IFormInput> = async (val) => {
    setMessage("Updating...")
    try {
      await axios.post(`${process.env.API_URL}/vendor/edit`, val, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      setMessage("")
    } catch (error) {
      setMessage("Some Error!")
    }
  }

  return (
    <>
      <div className="flex items-center justify-between ">
        <div>
          <h1>Your Profile</h1>
          <p className="text-xs">Check out your profile options here</p>
          {message && <h1 className="text-center text-red-400">{message}</h1>}
        </div>
        <div className="flex gap-4">
          <button className="rounded bg-primary px-4  py-2  ">General</button>
          <button
            className="rounded bg-trans px-4  py-2 "
            onClick={() =>
              dispatch(
                toggleModal({ showModal: true, modalType: "edit-password" })
              )
            }
          >
            Password
          </button>
        </div>
      </div>
      <p className="col-p-5 my-8 w-full border-[0.5px] border-gray px-4" />
      <div className="flex items-center justify-start gap-4 ">
        <Image
          src={"/girl.png"}
          alt="dpgirl"
          height={70}
          width={70}
          className="rounded-full"
        />
        <button className="rounded bg-primary px-4  py-1  ">Upload Now</button>
        <button className="rounded bg-trans px-4  py-1  ">Delete Pic</button>
      </div>
      <form
        className="flex  flex-col text-gray placeholder:text-sm "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mt-4 flex ">
          <div className="w-1/2 ">
            <label htmlFor="name" className=" block">
              Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="cborder mr-4 mt-2 rounded bg-[#1D1D1D]  px-4 py-2"
              placeholder="name"
            />
            <p className="mt-1 text-xs text-red-400">{errors?.name?.message}</p>
          </div>
          <div className="w-1/2 ">
            <label htmlFor="username" className=" block">
              Username
            </label>
            <input
              type="text"
              className="cborder mt-2 rounded bg-[#1D1D1D] px-4  py-2"
              placeholder="username"
              {...register("username")}
            />
            <p className="mt-1 text-xs text-red-400">
              {errors.username?.message}
            </p>
          </div>
        </div>
        <div className="mt-4 flex w-full">
          <div className=" w-1/2">
            <label htmlFor="email" className=" block">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="cborder mr-4 mt-2 rounded bg-[#1D1D1D]  px-4 py-2"
              placeholder="email"
            />
            <p className="mt-1 text-xs text-red-400">{errors.email?.message}</p>
          </div>
          <div className=" w-1/2">
            <label htmlFor="location" className=" block">
              Location
            </label>
            <input
              type="text"
              className="cborder mt-2 rounded bg-[#1D1D1D] px-4  py-2"
              placeholder="location"
              {...register("location")}
            />
            <p className="mt-1 text-xs text-red-400">
              {errors.location?.message}
            </p>
          </div>
        </div>
        <div className="">
          <label htmlFor="location" className=" block">
            Tags
          </label>
          <select
            {...register("tag")}
            className="cborder mr-4 mt-2 rounded bg-[#1D1D1D]  px-4 py-2"
          >
            {allTags.map((tag, i) => (
              <option className="bg-[#1D1D1D]" key={i} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-red-400">{errors.tag?.message}</p>
        </div>

        <div className="mt-4">
          <label htmlFor="bio" className="mb-2 block">
            Write Bio
          </label>
          <textarea
            id=""
            className="cborder w-full rounded bg-[#1D1D1D] p-2 "
            cols={40}
            rows={10}
            {...register("biography")}
          ></textarea>
          <p className="mt-1 text-xs text-red-400">
            {errors.biography?.message}
          </p>
        </div>

        <div className=" ">
          <label htmlFor="portfolio" className=" block">
            Personal Portfolio
          </label>
          <input
            type="text"
            className="cborder mt-2 w-full rounded bg-[#1D1D1D] px-4  py-2"
            placeholder="portfolio"
            {...register("portfolio")}
          />
          <p className="mt-1 text-xs text-red-400">
            {errors.portfolio?.message}
          </p>
        </div>
        <button className="mt-4 w-fit rounded bg-primary px-4 py-2 ">
          Save Changes
        </button>
      </form>
    </>
  )
}

export default Edit
