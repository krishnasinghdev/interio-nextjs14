"use client"

import type { ReactElement } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  isLogin,
  modalFor as MF,
  setLogout,
  showModal as SM,
  toggleModal,
  vendor as vd,
} from "@/context/theme"
import axios from "axios"
import clsx from "clsx"
import { AiFillAppstore, AiOutlineUser } from "react-icons/ai"
import { BsChatDots } from "react-icons/bs"
import { FiFolderMinus, FiSettings } from "react-icons/fi"
import {
  HiOutlineLogout,
  HiOutlineMail,
  HiOutlinePhotograph,
} from "react-icons/hi"
import { RiSuitcaseLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"

import Modal from "@/components/Modal"

type Props = {
  children?: React.ReactNode
  way?: string
}

export default function Designs({ children, way }: Props): ReactElement {
  const dispatch = useDispatch()
  const vendor = useSelector(vd)
  const pathname = usePathname()
  const modalFor = useSelector(MF)
  const showModal = useSelector(SM)
  const loginStatus = useSelector(isLogin)
  const logoutHandler = async () => {
    try {
      await axios.post(
        `${process.env.API_URL}/vendor/logout`,
        { role: "vendor" },
        {
          headers: {
            "Authorization ": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      dispatch(setLogout())
      // router.push("/designs");
    } catch (error) {
      console.log("Some Error!", error)
    }
  }
  return (
    <>
      {showModal && (
        <Modal
          onClick={() =>
            dispatch(toggleModal({ showModal: false, modalType: "" }))
          }
          component={modalFor}
        />
      )}

      <aside className="fixed hidden h-screen w-[280px] md:flex">
        <div className="flex h-screen w-[60px] flex-col items-center justify-evenly bg-black pb-[25vh] text-xl text-white ">
          <Link href="/">
            <Image
              src={"/interio.png"}
              alt="interio logo"
              height={35}
              width={35}
            />
          </Link>
          <Link href="/designs">
            <AiFillAppstore />
          </Link>
          <Link href="/profile/work">
            <AiOutlineUser />
          </Link>
          <button
            onClick={() =>
              dispatch(toggleModal({ showModal: true, modalType: "invite" }))
            }
          >
            <HiOutlineMail />
          </button>
          <button
            onClick={() =>
              dispatch(
                toggleModal({ showModal: true, modalType: "collection" })
              )
            }
          >
            <FiFolderMinus />
          </button>
          <p className="w-[2vw] border border-gray"> </p>
          <button title="Coming Soon!">
            <FiSettings />
          </button>
          {loginStatus && (
            <button onClick={logoutHandler}>
              <HiOutlineLogout />
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
        <div className="bluebg flex h-screen w-[220px] flex-col items-center justify-evenly pb-[35vh] text-xl  ">
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
            <HiOutlinePhotograph />
            <div>
              <h1 className="font-semibold">100k+</h1>
              <p className="text-xs text-light">Inspirations for you</p>
            </div>
          </Link>
          <div
            className={clsx(
              { "bg-lighter": pathname == "/suitcase" },
              "flex w-[200px] items-center gap-4 rounded-lg px-4 py-2"
            )}
          >
            <RiSuitcaseLine />
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
            <AiOutlineUser />
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
              },
              "flex w-[200px] items-center gap-4 rounded-lg px-4 py-2"
            )}
          >
            <BsChatDots />
            <div>
              <h1 className="font-semibold">09+</h1>
              <p className="text-xs text-light">Project messages</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* {way === 'without' ? (
        <div className='md:ml-[280px] w-max lg:w-auto min-h-screen bg-black '>{children}</div>
      ) : (
        <div className='md:ml-[280px] w-max lg:w-auto min-h-screen bg-black px-4 pt-8 text-white sm:px-8 xl:px-10 '>
          {children}
        </div>
      )} */}
      <div
        className={clsx(
          {
            "px-4 pt-4 text-white sm:px-8 md:pt-8 xl:px-10 ": way === "without",
          },
          "px-4 pt-4 text-white sm:px-8 md:ml-[280px] md:pt-8 lg:w-auto xl:px-10"
        )}
      >
        {children}
      </div>
    </>
  )
}
