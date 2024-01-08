"use client"

import type { ReactElement } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/context/hook"
import { isLogin, setLogout, togglePanel, vendor as vd } from "@/context/theme"
import clsx from "clsx"
import { toast } from "sonner"

import { vendorLogout } from "@/lib/actions/vendor.actions"
import { Icons } from "@/components/icons"

import DesignNav from "./design-nav"

type Props = {
  children?: React.ReactNode
  way?: "without" | "with"
}

export default function LeftSideBar({ children, way }: Props): ReactElement {
  const dispatch = useAppDispatch()
  const vendor = useAppSelector(vd)
  const pathname = usePathname()
  const loginStatus = useAppSelector(isLogin)

  const logoutHandler = async () => {
    try {
      const data = await vendorLogout()
      if (data.error) {
        return toast.error(data.error)
      }
      toast.success("Logout Successfully!")
      dispatch(setLogout())
    } catch (error: any) {
      toast.error(error?.message)
      console.log("Some Error!", error)
    }
  }
  return (
    <>
      <aside className="fixed hidden h-screen  md:flex">
        <div className="flex h-screen w-[60px] flex-col items-center justify-evenly border-r bg-black pb-[25vh] text-xl text-white lg:border-none ">
          <Link href="/">
            <Image src={"/interio.png"} alt="interio logo" height={35} width={35} />
          </Link>
          <Link href="/designs">
            <Icons.AiFillAppstore />
          </Link>
          <Link href="/profile">
            <Icons.AiOutlineUser />
          </Link>
          <button onClick={() => dispatch(togglePanel("invite"))}>
            <Icons.HiOutlineMail />
          </button>
          <button onClick={() => dispatch(togglePanel("collection"))}>
            <Icons.FiFolderMinus />
          </button>
          <p className="border-gray w-[2vw] border"> </p>
          <button title="Coming Soon!">
            <Icons.FiSettings />
          </button>

          <div className="cursor-pointer">{loginStatus && <Icons.HiOutlineLogout onClick={logoutHandler} />}</div>

          {loginStatus && (
            <Link href="/profile" className="absolute bottom-8 ">
              <Image
                src={vendor?.profilePic || "/dp2.png"}
                alt="interio logo"
                height={40}
                width={40}
                className="h-10 w-10 rounded-full object-fill "
              />
            </Link>
          )}
        </div>
        <div className="bluebg hidden h-screen w-[220px] flex-col items-center justify-evenly pb-[35vh] text-xl text-secondary lg:flex  ">
          <div className="mt-3 w-[200px]">
            {/* ?.split(' ')[0] */}
            <h3 className="font-sm font-medium">Hello {vendor?.vendor},</h3>
            <p className="text-light text-xs">Check out your store analysis</p>
          </div>

          <Link
            href="/designs"
            className={clsx(
              { "bg-secondary/70 text-white": pathname == "/designs" },
              "flex w-[200px] items-center gap-x-2 rounded-lg px-4 py-2"
            )}
          >
            <Icons.HiOutlinePhotograph size={30} />
            <div>
              <h3 className="font-sm font-medium">10k+</h3>
              <p className="text-light text-xs">Inspirations for you</p>
            </div>
          </Link>
          <div
            className={clsx(
              { "bg-secondary text-white": pathname == "/suitcase" },
              "flex w-[200px] items-center gap-x-2 rounded-lg px-4 py-2"
            )}
          >
            <Icons.RiSuitcaseLine />
            <div>
              <h3 className="font-sm font-medium">123+</h3>
              <p className="text-light text-xs">
                Find Work <br /> (coming soon)
              </p>
            </div>
          </div>
          <div
            className={clsx(
              { "bg-secondary text-white": pathname == "/user" },
              "flex w-[200px] items-center gap-x-2 rounded-lg px-4 py-2"
            )}
          >
            <Icons.AiOutlineUser />
            <div>
              <h3 className="font-sm font-medium">104+</h3>
              <p className="text-light text-xs">
                Hire Designer <br /> (coming soon)
              </p>
            </div>
          </div>
          <Link
            href={`/profile/chat?v_id=${vendor.v_id}`}
            className={clsx(
              {
                "bg-secondary text-white": pathname == "/profile/chat" || pathname == "/profile/chat/[ChatId]",
                "pointer-events-none": !loginStatus,
              },
              "flex w-[200px] items-center gap-x-2 rounded-lg px-4 py-2"
            )}
          >
            <Icons.BsChatDots />
            <div>
              {loginStatus ? (
                <>
                  <h3 className="font-sm font-medium">{"5+"}</h3>
                  <p className="text-light text-xs">Project messages</p>
                </>
              ) : (
                <p className="text-light text-sm">Login to chat</p>
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
          "px-4 py-8 text-white sm:px-8 md:ml-[65px] md:pt-8 lg:ml-[280px] lg:w-auto xl:px-10"
        )}
      >
        {!(pathname == "/designs/upload" || pathname.startsWith("/profile")) && <DesignNav />}
        {children}
      </div>
    </>
  )
}
