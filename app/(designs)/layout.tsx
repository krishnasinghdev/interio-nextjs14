"use client"

import type { ReactElement } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/context/hook"
import {
  isLogin,
  setLogout,
  toggleModal,
  vendor as vd,
} from "@/context/theme"
import clsx from "clsx"

import { Icons } from "@/components/Icons"
import DesignNav from "./design-nav"

type Props = {
  children?: React.ReactNode
  way?: string
}

export default function Designs({ children, way }: Props): ReactElement {
  const dispatch = useAppDispatch()
  const vendor = useAppSelector(vd)
  const pathname = usePathname()
  const loginStatus = useAppSelector(isLogin)

  const logoutHandler = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw Error("No Token!")
      }
      dispatch(setLogout({ token }))
    } catch (error) {
      console.log("Some Error!", error)
    }
  }
  return (
    <>
      <aside className="fixed hidden h-screen w-[280px] md:flex">
        <div className="flex h-screen w-[60px] flex-col items-center justify-evenly border-r bg-black pb-[25vh] text-xl text-white lg:border-none ">
          <Link href="/">
            <Image
              src={"/interio.png"}
              alt="interio logo"
              height={35}
              width={35}
            />
          </Link>
          <Link href="/designs">
            <Icons.AiFillAppstore />
          </Link>
          <Link href="/profile/work">
            <Icons.AiOutlineUser />
          </Link>
          <button
            onClick={() =>
              dispatch(toggleModal({ showModal: true, modalType: "invite" }))
            }
          >
            <Icons.HiOutlineMail />
          </button>
          <button
            onClick={() =>
              dispatch(
                toggleModal({ showModal: true, modalType: "collection" })
              )
            }
          >
            <Icons.FiFolderMinus />
          </button>
          <p className="w-[2vw] border border-gray"> </p>
          <button title="Coming Soon!">
            <Icons.FiSettings />
          </button>
          {loginStatus && (
            <button onClick={logoutHandler}>
              <Icons.HiOutlineLogout />
            </button>
          )}

          {loginStatus && (
            <Link href="/profile/about" className="absolute bottom-8 ">
              <Image
                src={"/dp.png"}
                alt="interio logo"
                height={35}
                width={35}
                className="rounded-full bg-primary "
              />
            </Link>
          )}
        </div>
        <div className="bluebg hidden h-screen w-[220px] flex-col items-center justify-evenly pb-[35vh] text-xl lg:flex  ">
          <div className="mt-3 w-[200px]">
            {/* ?.split(' ')[0] */}
            <h1 className="font-semibold">Hello {vendor?.vendor},</h1>
            <p className="text-xs text-light">Check out your store analysis</p>
          </div>

          <Link
            href="/designs"
            className={clsx(
              { "bg-lighter": pathname == "/designs" },
              "flex w-[200px] items-center gap-4 rounded-lg px-4 py-2"
            )}
          >
            <Icons.HiOutlinePhotograph />
            <div>
              <h1 className="font-semibold">10k+</h1>
              <p className="text-xs text-light">Inspirations for you</p>
            </div>
          </Link>
          <div
            className={clsx(
              { "bg-lighter": pathname == "/suitcase" },
              "flex w-[200px] items-center gap-4 rounded-lg px-4 py-2"
            )}
          >
            <Icons.RiSuitcaseLine />
            <div>
              <h1 className="font-semibold">123+</h1>
              <p className="text-xs text-light">
                Find Work <br /> (coming soon)
              </p>
            </div>
          </div>
          <div
            className={clsx(
              { "bg-lighter": pathname == "/user" },
              "flex w-[200px] items-center gap-4 rounded-lg px-4 py-2"
            )}
          >
            <Icons.AiOutlineUser />
            <div>
              <h1 className="font-semibold">104+</h1>
              <p className="text-xs text-light">
                Hire Designer <br /> (coming soon)
              </p>
            </div>
          </div>
          <Link
            href={`/profile/chat?v_id=${vendor.v_id}`}
            className={clsx(
              {
                "bg-lighter":
                  pathname == "/profile/chat" ||
                  pathname == "/profile/chat/[ChatId]",
                "pointer-events-none": !loginStatus,
              },
              "flex w-[200px] items-center gap-4 rounded-lg px-4 py-2"
            )}
          >
            <Icons.BsChatDots />
            <div>
              {loginStatus ? (
                <>
                  <h1 className="font-semibold">{"5+"}</h1>
                  <p className="text-xs text-light">Project messages</p>
                </>
              ) : (
                <p className="text-sm text-light">Login to chat</p>
              )}
            </div>
          </Link>
        </div>
      </aside>
      <div
        className={clsx(
          {
            "px-4 pt-4 text-white sm:px-8 md:pt-8 xl:px-10 ": way === "without",
          },
          "px-4 pt-4 text-white sm:px-8 md:ml-[65px] md:pt-8 lg:ml-[280px] lg:w-auto xl:px-10"
        )}
      >
        {
          !(pathname == "/designs/upload") && (<DesignNav/>)
        }
        {children}
      </div>
    </>
  )
}
