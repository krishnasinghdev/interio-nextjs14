"use client"

import type { ReactElement } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { isLogin, vendor as vd } from "@/context/theme"
import clsx from "clsx"
import { useSelector } from "react-redux"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}): ReactElement {
  const pathname = usePathname()
  const loginStatus = useSelector(isLogin)
  const vendor = useSelector(vd)
  return (
    <>
      <Image
        key={2}
        src={"/coverimg.png"}
        alt="cover_image"
        className=""
        height={300}
        width={1300}
      />
      {loginStatus ? (
        <>
          {
            !(pathname == "/profile/edit") && ( <>
          <section className="-mt-4 flex items-center justify-between px-8 text-white">
            <div className="flex items-center gap-4  ">
              <Image src={"/dp2.png"} alt="dp2" width={100} height={100} />
              <div>
                <h1>{vendor?.vendor}</h1>
                <p className="text-xs text-gray">
                  0 Followers | 0 Following | 21 Likes
                </p>
              </div>
            </div>
            <div className="">
              {pathname == "/profile/edit" ? (
                <Link className="cborder mr-4  rounded bg-trans px-4 py-2 " href={"/profile"}>
                  Cancel Edit
                </Link>)
                :
                <Link
                  href={"/profile/edit"}
                  className="  rounded bg-primary px-4 py-2 "
                >
                  Edit Profile
                </Link>
              }
            </div>
          </section>
          
              <header className="flex items-center justify-around py-4 text-gray">
            <Link
              href={"/profile/work"}
              className={clsx(
                { "text-primary": pathname == "profile/work" },
                "hover:text-primary"
              )}
            >
              Works
            </Link>
            <Link
              href={"/profile/liked-shot"}
              className={clsx(
                { "text-primary": pathname == "profile/liked-shot" },
                "hover:text-primary"
              )}
            >
              Liked Shots
            </Link>
            <Link
              href={"/profile/collection"}
              className={clsx(
                { "text-primary": pathname == "profile/collection" },
                "hover:text-primary"
              )}
            >
              Collections
            </Link>
            <Link
              href={"/profile/about"}
              className={clsx(
                { "text-primary": pathname == "profile/about" },
                "hover:text-primary"
              )}
            >
              About me
            </Link>
              </header>
              <p className="mb-4 w-full border-[0.5px] border-gray px-4" />
          </>  )
          }
          <div className="px-8 ">
            
            {children}
          </div>
        </>
      ) : (
        <h1 className="mt-8 text-center text-gray">
          Login/Signup to access messages!
        </h1>
      )}
    </>
  )
}
