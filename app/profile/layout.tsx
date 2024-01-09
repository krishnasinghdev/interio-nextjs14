"use client"

import type { ReactElement } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAppDispatch } from "@/context/hook"
import { isLogin, togglePanel, vendor as vd } from "@/context/theme"
import { useSelector } from "react-redux"
import { toast } from "sonner"

import { Button, buttonVariants } from "@/components/ui/button"
import LeftSideBar from "@/app/(designs)/layout"

export default function Layout({ children }: { children: React.ReactNode }): ReactElement {
  const pathname = usePathname()
  const loginStatus = useSelector(isLogin)
  const vendor = useSelector(vd)
  const dispatch = useAppDispatch()

  if (!loginStatus) {
    toast.error("Signup/Signin for checking profile!")
  }
  return (
    <LeftSideBar>
      <>
        <section className="flex-col">
          <Image key={2} src={"/coverimg.png"} alt="cover_image" className="block w-full rounded" height={170} width={740} />
          {loginStatus && (
            <div className="relative -mt-16 flex  items-center justify-between rounded bg-secondary/80 p-2 px-4 text-white md:-mt-24">
              <div className="flex items-center gap-4">
                <Image
                  src={vendor?.profilePic || "/dp2.png"}
                  alt="dp2"
                  width={80}
                  height={80}
                  className="h-12 w-12 rounded-full md:h-20 md:w-20"
                />
                <div>
                  <h1>{vendor?.vendor}</h1>
                  <p className="text-gray text-xs">0 Followers | 0 Following</p>
                </div>
              </div>
              <Link
                className={buttonVariants({
                  variant: pathname == "/profile/edit" ? "outline" : "default",
                })}
                href={pathname == "/profile/edit" ? "/profile" : "/profile/edit"}
              >
                {pathname == "/profile/edit" ? "Cancel Edit" : "Edit Profile"}
              </Link>
            </div>
          )}
        </section>
        {loginStatus ? (
          <>
            {!(pathname == "/profile/edit") && (
              <main>
                <header className="text-gray my-2 grid grid-cols-4 items-center justify-between gap-2 max-md:flex max-md:overflow-x-scroll">
                  <Link
                    href={"/profile"}
                    className={`${buttonVariants({
                      variant: "secondary",
                    })} ${pathname == "/profile" ? "bg-secondary/50 text-primary" : "text-white"} min-w-fit`}
                  >
                    About me
                  </Link>
                  <Link
                    href={"/profile/work"}
                    className={`${buttonVariants({
                      variant: "secondary",
                    })} ${pathname == "/profile/work" ? "bg-secondary/80 text-primary" : "text-white"} min-w-fit`}
                  >
                    Work
                  </Link>

                  <Link
                    href={"/profile/liked-shot"}
                    className={`${buttonVariants({
                      variant: "secondary",
                    })} ${pathname == "/profile/liked-shot" ? "bg-secondary/80 text-primary" : "text-white"} min-w-fit`}
                  >
                    Liked Shots
                  </Link>
                  <Link
                    href={"/profile/collection"}
                    className={`${buttonVariants({
                      variant: "secondary",
                    })} ${pathname == "/profile/collection" ? "bg-secondary/80 text-primary" : "min-w-fit text-white"}
                    `}
                  >
                    Collections
                  </Link>
                </header>
                <p className="border-gray mb-4 w-full border-[0.5px] px-4" />
              </main>
            )}
            {children}
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
    </LeftSideBar>
  )
}
