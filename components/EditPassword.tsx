import { useState } from "react"
import { joiResolver } from "@hookform/resolvers/joi"
import axios from "axios"
import Joi from "joi"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import ModalHeader from "./ModalHeader"

interface IFormInput {
  oldPassword: string
  newPassword: string
  email: string
  cnewPassword: string
}

const schema = Joi.object({
  oldPassword: Joi.string().min(3).required(),
  email: Joi.string().min(3).required(),
  newPassword: Joi.string().min(3).required(),
  cnewPassword: Joi.ref("newPassword"),
})

const EditPassword = ({ onClick }: { onClick: () => void }) => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState<string>("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: joiResolver(schema),
  })
  const onSubmit: SubmitHandler<IFormInput> = async (val) => {
    setMessage("Updating...")
    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/vendor/update-password`,
        val,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      console.log(data)
      setMessage("")
      onClick()
    } catch (error) {
      setMessage("Some Error!")
    }
  }

  return (
    <section className="m-auto w-11/12 rounded bg-[#0F0F0F] p-8 md:w-1/2 ">
      <ModalHeader onClick={onClick} title="Update your password" />
      {message && (
        <p className="mt-2 text-center text-sm text-red-500">{message}</p>
      )}
      <form
        className="flex flex-col bg-[#0F0F0F] text-gray placeholder:text-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="email" className="mt-4 block">
          Email
        </label>
        <input
          className="mt-2 rounded bg-[#1D1D1D] px-4  py-2"
          type="email"
          placeholder="Type here..."
          autoComplete="true"
          {...register("email")}
        />
        <label htmlFor="oldPassword" className="mt-4 block">
          Current Password
        </label>
        <input
          className="mt-2 rounded bg-[#1D1D1D] px-4  py-2"
          type="password"
          placeholder="Type here..."
          autoComplete="true"
          {...register("oldPassword")}
        />
        <span className="mt-1 text-xs text-red-400">
          {errors.oldPassword?.message}
        </span>
        <label htmlFor="newPassword" className="mt-4 block">
          New Password
        </label>
        <input
          type="password"
          className="mt-2 rounded bg-[#1D1D1D] px-4  py-2"
          placeholder="Type here..."
          {...register("newPassword")}
          autoComplete="true"
        />
        <span className="mt-1 text-xs text-red-400">
          {errors.newPassword?.message}
        </span>
        <label htmlFor="cnewPassword" className="mt-4 block">
          Confirm Password
        </label>
        <input
          type="password"
          className="mt-2 rounded bg-[#1D1D1D] px-4  py-2"
          placeholder="Type here..."
          {...register("cnewPassword")}
          autoComplete="true"
        />
        <span className="mt-1 text-xs text-red-400">
          {errors.cnewPassword?.message}
        </span>
        <button className="mt-4 w-full rounded bg-primary p-2 ">
          {message ? message : "Update Password"}
        </button>
      </form>
    </section>
  )
}

export default EditPassword
