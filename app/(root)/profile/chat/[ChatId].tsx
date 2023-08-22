/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import axios from "axios"
import clsx from "clsx"
import { SubmitHandler, useForm } from "react-hook-form"
import io from "socket.io-client"

import SideLayout from "../../../components/SideLayout"
import { chatType, messageProp, vendorType } from "../../../types/shotType"

interface IFormInput {
  message: String
}
;[]
type chatProp = {
  messageArr: messageProp[] | any
  vendors: Array
}

function ChatId({ messageArr, users }: chatProp) {
  const { query } = useRouter()
  const socket = useRef()
  const [message, setMessage] = useState("")
  const [vendors, setVendors] = useState<vendorType[]>([])
  const [chats, setChats] = useState<chatType[]>([])
  const [sender, setSender] = useState<vendorType>()
  const [reciever, setReciever] = useState<vendorType>()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({})
  const chatWindowRef = useRef(null)

  useEffect(() => {
    socket.current = io("ws://localhost:4000")
    const allchats = messageArr?.map((mes: any) => {
      return {
        message: mes.content,
        sender: mes.sender,
      }
    })
    setChats(allchats)
    users?.forEach((obj: vendorType) => {
      if (obj._id == localStorage.getItem("v_id")) {
        setSender(obj)
        socket.current.emit("addUser", { userId: obj._id })
      } else {
        setReciever(obj)
      }
    })
  }, [])

  useEffect(() => {
    socket.current.on("getMessage", ({ message, sender }: chatType) => {
      setChats((prev) => [...prev, { message, sender }])
    })
  }, [])

  useEffect(() => {
    const chatWindow = chatWindowRef.current
    // // @ts-ignore
    chatWindow.scrollTop = chatWindow.scrollHeight
    // chatWindowRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats])
  console.log(chats)
  const onSubmit: SubmitHandler<IFormInput> = async (val) => {
    try {
      setChats((prev) => [
        ...prev,
        {
          message: val.message,
          sender: localStorage.getItem("v_id"),
        },
      ])
      socket.current.emit("sendMessage", {
        from: localStorage.getItem("v_id"),
        to: reciever?._id,
        chat: query.ChatId,
        content: val.message,
      })
      reset()
    } catch (error) {
      setMessage("Some Error!")
    }
  }

  return (
    <SideLayout>
      <header className="sticky top-0 flex  gap-4 bg-black pb-4">
        <Image src={"/dp2.png"} alt="dp2" width={50} height={50} />
        <div>
          <h1>{reciever?.name}</h1>
          <p className="text-xs text-gray">
            {reciever?.follower.length} Follower | {reciever?.following.length}{" "}
            Following | {reciever?.likedShot.length} Likes
          </p>
        </div>
      </header>
      <p className="mb-4 w-full border-[0.5px] border-gray px-4" />
      {chats.length < 0 && (
        <Image
          src={"/gvector.png"}
          alt="dp2"
          width={300}
          className="m-auto mt-8 "
          height={300}
        />
      )}
      <section
        className="z-0 flex h-[75vh] flex-col overflow-auto pb-4 pr-4 scrollbar-thin scrollbar-track-trans scrollbar-thumb-primary"
        ref={chatWindowRef}
      >
        {chats.length > 0 &&
          chats.map((mes, i) => (
            <p
              key={i}
              className={clsx(
                {
                  "self-end": mes?.sender == sender?._id,
                  "self-start": mes?.sender == sender?._id,
                },
                "my-2 w-fit rounded-full bg-trans px-3 py-1 text-gray  "
              )}
            >
              {mes.message}
            </p>
          ))}
      </section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fixed  bottom-0 z-10 flex w-[70%] items-center  justify-center gap-4 bg-black pb-4"
      >
        <input
          type="text"
          placeholder="Type message..."
          {...register("message")}
          required
          className="m-auto w-full rounded bg-trans px-4 py-2  "
        />
        <button type="submit" className="rounded bg-primary px-4 py-2">
          Send
        </button>
      </form>
    </SideLayout>
  )
}

export default ChatId

export async function getServerSideProps({ query }: any) {
  let result = {
    messageArr: [{ sender: "", content: "", readBy: [], createdAt: "" }],
    users: [],
  }

  try {
    const { data } = await axios.get(
      `${process.env.API_URL}/message/${query.ChatId}`
    )
    if (data?.data) {
      result.messageArr = data.data.messages
      result.users = data.data.vendors
    }
  } catch (error) {}

  return { props: result }
}
