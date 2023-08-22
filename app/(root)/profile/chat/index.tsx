import React from "react"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
import { useSelector } from "react-redux"

import SideLayout from "../../../components/SideLayout"
import { isLogin as loginStatus } from "../../../context/theme"

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo("en-US")

function Chat({ chats }: any) {
  const isLogin = useSelector<Boolean>(loginStatus)
  console.log(chats)
  const getName = (vendors: any) => {
    const vendor = vendors?.find(
      (v: any) => !(v._id == localStorage.getItem("v_id"))
    )
    if (!vendor) return
    return vendor.name
  }

  return (
    <SideLayout>
      <header className="pb-4">
        <h1>Message</h1>
        <p className="text-xs text-gray">
          Message other designers and build connections!
        </p>
      </header>
      <p className="mb-4 w-full border-[0.5px] border-gray px-4" />

      {isLogin ? (
        <main className="flex flex-col  text-gray">
          {chats.length > 0 ? (
            chats.map((chat: any) => (
              <Link href={`/profile/chat/${chat._id}`} key={chat._id}>
                <div className="my-4  grid grid-cols-10 items-center justify-between justify-items-start gap-2">
                  <div className="col-span-3  flex  items-center gap-4">
                    <Image src={"/dp2.png"} alt="dp2" width={70} height={70} />
                    <div>
                      <h1>{getName(chat.vendors)}</h1>
                      {/* <p className='text-xs text-gray'>Last online 21 days ago</p> */}
                    </div>
                  </div>
                  <p className="col-span-5 rounded-full bg-trans px-4 py-2 text-sm">
                    {chat?.latestMessage?.content}
                  </p>
                  <p className="col-span-2  ">
                    {timeAgo.format(new Date(chat.updatedAt))}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="mb-4 text-center">Nothing to show!</p>
          )}
          <p className="mb-4 w-full border-[0.5px] border-gray px-4" />
        </main>
      ) : (
        <h1 className="text-center text-gray">
          Login/Signup to access messages!
        </h1>
      )}
    </SideLayout>
  )
}

export default Chat

export async function getServerSideProps({ query }: any) {
  let result = { chats: [] }

  try {
    const { data } = await axios.get(
      `${process.env.API_URL}/chat/${query.v_id}`
    )
    if (data?.data) {
      result.chats = data.data.chats
    }
  } catch (error) {}

  return { props: result }
}
