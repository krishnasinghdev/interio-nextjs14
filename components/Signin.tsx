import { useState } from "react"
import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import { vendorLogin } from "@/lib/actions/vendor.actions"

import { setLogin } from "../context/theme"
import ModalHeader from "./ModalHeader"

interface IFormInput {
  email: string
  password: string
}

const schema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .label("Email/Username is required "),
  password: Joi.string().min(3).required(),
})

const Signin = ({ onClick }: { onClick: () => void }) => {
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
    setMessage("Loading...")
    try {
      const data = await vendorLogin(val)
      console.log(data)
      dispatch(
        setLogin({
          vendor: data.name,
          v_id: data._id,
          token: data.token,
        })
      )
      setMessage("")
      onClick()
    } catch (error) {
      setMessage("Some Error!")
    }
  }

  return (
    <section className="m-auto w-11/12 rounded bg-[#0F0F0F] p-8 md:w-1/2 ">
      <ModalHeader
        onClick={onClick}
        title="Fill in the below details and sign in to Interio"
      />
      {message && (
        <p className="mt-2 text-center text-sm text-red-500">{message}</p>
      )}
      <form
        className="flex flex-col bg-[#0F0F0F] text-gray placeholder:text-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="email" className="mt-4 block">
          Username
        </label>
        <input
          className="mt-2 rounded bg-[#1D1D1D] px-4  py-2"
          type="email"
          placeholder="Type here..."
          autoComplete="true"
          {...register("email")}
        />
        <span className="mt-1 text-xs text-red-400">
          {errors.email?.message}
        </span>
        <label htmlFor="password" className="mt-4 block">
          Password
        </label>
        <input
          type="password"
          className="mt-2 rounded bg-[#1D1D1D] px-4  py-2"
          placeholder="Type here..."
          {...register("password")}
          autoComplete="true"
        />
        <span className="mt-1 text-xs text-red-400">
          {errors.password?.message}
        </span>
        <button className="mt-4 w-full rounded bg-primary p-2 ">
          {message ? message : "Sign in"}
        </button>
      </form>
    </section>
  )
}

export default Signin
