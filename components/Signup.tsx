import { useState } from "react"
import { useAppDispatch } from "@/context/hook"
import { joiResolver } from "@hookform/resolvers/joi"
// import axios from "axios"
import Joi from "joi"
import { SubmitHandler, useForm } from "react-hook-form"

import { addVendor } from "@/lib/actions/vendor.actions"

import { setLogin } from "../context/theme"
import ModalHeader from "./ModalHeader"

interface IFormInput {
  name: string
  username: string
  email: string
  password: string
  cpassword: string
}

const schema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .label("Email/Username is required "),
  password: Joi.string().min(3).required(),
  cpassword: Joi.ref("password"),
  name: Joi.string().required(),
  username: Joi.string().min(5).required(),
})

const Signup = ({ onClick }: { onClick: () => void }) => {
  const dispatch = useAppDispatch()
  const [message, setMessage] = useState<string>("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: joiResolver(schema),
  })

  const onSubmit: SubmitHandler<IFormInput> = async (val) => {
    setMessage("Creating Account...")
    try {
      //@ts-ignore - cpassword is not optional
      delete val.cpassword
      const data = await addVendor(val)
      // console.log(data)
      setMessage("")
      dispatch(
        setLogin({
          vendor: data.name,
          v_id: data._id,
          token: data.token,
        })
      )
      onClick()
    } catch (error) {
      setMessage("Some Error!")
    }
  }

  return (
    <section className="z-10 m-auto rounded bg-[#0F0F0F] p-6 md:w-1/2">
      <ModalHeader
        heading="Make your account"
        onClick={onClick}
        title="Create a new account and explore the community"
      />

      {message && (
        <p className="mt-2 text-center text-sm text-red-500">{message}</p>
      )}
      <form
        className="flex flex-col bg-[#0F0F0F] text-gray placeholder:text-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mt-4  grid gap-4 md:grid-cols-2">
          <p className="col-span-1">
            <label htmlFor="name" className=" block">
              Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="mt-2 w-full rounded bg-[#1D1D1D] px-4 py-2"
              placeholder="name"
              required={true}
            />
            <span className="mt-1 text-xs text-red-400">
              {errors.name?.message}
            </span>
          </p>
          <p className="col-span-1 ">
            <label htmlFor="username" className=" block">
              Username
            </label>
            <input
              type="text"
              className="mt-2 w-full rounded bg-[#1D1D1D] px-4  py-2"
              placeholder="username"
              {...register("username")}
              required={true}
            />
            <span className="mt-1 text-xs text-red-400">
              {errors.username?.message}
            </span>
          </p>
        </div>
        <label htmlFor="email" className="mt-4 block">
          Email
        </label>
        <input
          type="email"
          className="mt-2 rounded bg-[#1D1D1D] px-4  py-2"
          placeholder="email"
          {...register("email")}
          required={true}
        />
        <span className="mt-1 text-xs text-red-400">
          {errors.email?.message}
        </span>
        <label htmlFor="cpassword" className="mt-4 block">
          Password
        </label>
        <input
          type="password"
          className="mt-2 rounded bg-[#1D1D1D] px-4  py-2"
          placeholder="password"
          {...register("password")}
          autoComplete="true"
          required={true}
        />
        <span className="mt-1 text-xs text-red-400">
          {errors.password?.message}
        </span>
        <label htmlFor="password" className="mt-4 block">
          Confirm Password
        </label>
        <input
          type="password"
          className="mt-2 rounded bg-[#1D1D1D] px-4  py-2"
          placeholder="confirm password"
          autoComplete="true"
          required={true}
          {...register("cpassword")}
        />
        <span className="mt-1 text-xs text-red-400">
          {errors.cpassword?.message}
        </span>
        <p className="mt-4">
          <input
            type="checkbox"
            className="mr-2 mt-2 inline rounded bg-[#1D1D1D] px-4 py-2"
            name="checkbox"
            required={true}
            defaultChecked
          />
          <label htmlFor="checkbox" className="">
            Creating an account means you’re okay with our <br />
            <span className="text-primary">Terms of Service</span> &
            <span className="text-primary">Privacy Policy</span>
          </label>
        </p>
        <button className="mt-4 w-full rounded bg-primary p-2 ">
          {message ? message : "Sign up"}
        </button>
      </form>
    </section>
  )
}

export default Signup
