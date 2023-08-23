import { useState } from "react"
import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"
import { SubmitHandler, useForm } from "react-hook-form"

// import { useDispatch } from "react-redux"

import ModalHeader from "./ModalHeader"

interface IFormInput {
  name: string
  email: string
}

const schema = Joi.object({
  name: Joi.string().min(3).required().label("Name is required "),
  email: Joi.string().required().label("Email is required "),
})

const Invite = ({ onClick }: { onClick: () => void }) => {
  // const dispatch = useDispatch()
  const [message, setMessage] = useState<string>("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: joiResolver(schema),
  })
  const onSubmit: SubmitHandler<IFormInput> = async () => {
    setMessage("Loading...")
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
      setMessage("")
      onClick()
    } catch (error) {
      setMessage("Some Error!")
    }
  }

  return (
    <section className="m-auto w-11/12 rounded bg-[#0F0F0F] p-8 md:w-1/2 ">
      <ModalHeader
        heading="Invite a friend"
        onClick={onClick}
        title="Invite a designer to share their work on Dribbble"
      />
      {message && (
        <p className="mt-2 text-center text-sm text-red-500">{message}</p>
      )}
      <form
        className="flex flex-col bg-[#0F0F0F] text-gray placeholder:text-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="email" className="mt-2 block">
          Name
        </label>
        <input
          className="mt-2 rounded bg-[#1D1D1D] px-4  py-2"
          type="text"
          placeholder="Type here..."
          autoComplete="true"
          {...register("name")}
        />
        <span className="mt-1 text-xs text-red-400">
          {errors.name?.message}
        </span>
        <label htmlFor="password" className="mt-4 block">
          Email Address
        </label>
        <input
          type="email"
          className="mt-2 rounded bg-[#1D1D1D] px-4  py-2"
          placeholder="Type here..."
          {...register("email")}
          autoComplete="true"
        />
        <span className="mt-1 text-xs text-red-400">
          {errors.email?.message}
        </span>
        <button className="mt-4 w-full rounded bg-primary p-2 text-white ">
          {message ? message : "Send Invite"}
        </button>
      </form>
    </section>
  )
}

export default Invite
