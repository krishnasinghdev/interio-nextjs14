"use client"

import type { ReactElement } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAppDispatch } from "@/context/hook"
import { isLogin, togglePanel, vendor as vd } from "@/context/theme"
import clsx from "clsx"
import { useSelector } from "react-redux"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export default function Layout({ children }: { children: React.ReactNode }): ReactElement {
  const pathname = usePathname()
  const loginStatus = useSelector(isLogin)
  const vendor = useSelector(vd)
  const dispatch = useAppDispatch()

  if (!loginStatus) {
    toast.error("Signup/Signin for checking profile!")
  }
  return (
    <>
      <Image key={2} src={"/coverimg.png"} alt="cover_image" className="w-full" height={300} width={1500} />
      {loginStatus ? (
        <>
          {!(pathname == "/profile/edit") && (
            <>
              <section className="-mt-4 flex items-center justify-between px-8 text-white">
                <div className="flex items-center gap-4  ">
                  <Image src={"/dp2.png"} alt="dp2" width={100} height={100} />
                  <div>
                    <h1>{vendor?.vendor}</h1>
                    <p className="text-gray text-xs">0 Followers | 0 Following | 21 Likes</p>
                  </div>
                </div>
                <div className="">
                  {pathname == "/profile/edit" ? (
                    <Link className="cborder bg-trans  mr-4 rounded px-4 py-2 " href={"/profile"}>
                      Cancel Edit
                    </Link>
                  ) : (
                    <Link href={"/profile/edit"} className="  rounded bg-primary px-4 py-2 ">
                      Edit Profile
                    </Link>
                  )}
                </div>
              </section>

              <header className="text-gray flex items-center justify-around py-4">
                <Link href={"/profile/work"} className={clsx({ "text-primary": pathname == "profile/work" }, "hover:text-primary")}>
                  Works
                </Link>
                <Link
                  href={"/profile/liked-shot"}
                  className={clsx({ "text-primary": pathname == "profile/liked-shot" }, "hover:text-primary")}
                >
                  Liked Shots
                </Link>
                <Link
                  href={"/profile/collection"}
                  className={clsx({ "text-primary": pathname == "profile/collection" }, "hover:text-primary")}
                >
                  Collections
                </Link>
                <Link href={"/profile/about"} className={clsx({ "text-primary": pathname == "profile/about" }, "hover:text-primary")}>
                  About me
                </Link>
              </header>
              <p className="border-gray mb-4 w-full border-[0.5px] px-4" />
            </>
          )}
          <div className="px-8 ">{children}</div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-gray mt-8 text-center">
            Login/Signup to access messages! or Back to{" "}
            <Link href="/designs" className="text-primary underline">
              Designs
            </Link>{" "}
          </h1>
          <div className="mt-4 flex gap-4">
            <Button className="mr-4 rounded bg-primary px-4 py-2" onClick={() => dispatch(togglePanel("signup"))}>
              Sign up
            </Button>
            <Button className="rounded bg-secondary px-4 py-2" onClick={() => dispatch(togglePanel("signin"))}>
              Sign in
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
