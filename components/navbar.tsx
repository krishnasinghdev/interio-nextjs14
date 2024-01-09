"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/context/hook"
import clsx from "clsx"

import { isLogin as loginStatus, togglePanel } from "../context/theme"
import { Icons } from "./icons"
import { Button } from "./ui/button"

const Navbar = () => {
  // const isLogin = false
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector(loginStatus)
  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      <header className="padding bg-dark flex items-center justify-between text-white ">
        <Link href="/">
          <Image src={"/interio.png"} alt="interio logo" height={40} width={40} />
        </Link>
        <nav className="flex items-center gap-4 ">
          <div className="hidden gap-6 md:flex">
            <Link
              href="/"
              className={clsx(
                {
                  "border-b-2 border-primary text-primary": pathname === "/",
                },
                "hover:text-primary"
              )}
            >
              Home
            </Link>
            <Link
              href="/designs"
              className={clsx(
                {
                  "border-b-2 border-primary text-primary": pathname === "/designs",
                },
                "hover:text-primary"
              )}
            >
              Designs
            </Link>
            <Link
              href="/about-us"
              className={clsx(
                {
                  "border-b-2 border-primary text-primary": pathname === "/about-us",
                },
                "hover:text-primary"
              )}
            >
              About us
            </Link>
          </div>
          <div className="flex justify-between gap-4 text-lg ">
            {isLogin ? (
              <Link href="/profile" className="sm:rounded-full sm:border-2 sm:border-primary sm:px-6 sm:py-1 sm:text-primary ">
                Hello
              </Link>
            ) : (
              <>
                <Button
                  variant="fill"
                  size="lg"
                  className="hidden rounded-full sm:block"
                  onClick={() => dispatch(togglePanel("signup"))}
                >
                  Sign up
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="hidden rounded-full sm:block"
                  onClick={() => dispatch(togglePanel("signin"))}
                >
                  Sign in
                </Button>
              </>
            )}
            {showMenu ? (
              <Icons.MdCancelPresentation
                className={clsx({ "absolute right-4 top-4 z-50": showMenu }, "text-[2.5rem] md:hidden")}
                onClick={() => setShowMenu((prev) => !prev)}
              />
            ) : (
              <Icons.CgMenuRightAlt className="text-[2.5rem] md:hidden" onClick={() => setShowMenu((prev) => !prev)} />
            )}
          </div>
        </nav>
        {/* PHONE MENU */}
      </header>

      {showMenu && (
        <div className="absolute top-0 z-10 flex h-auto w-screen flex-col items-center gap-4 bg-card py-10 text-white transition-all duration-200 ">
          <Link
            href="/"
            className={clsx(
              {
                "border-b-2 border-primary text-primary": pathname === "/",
              },
              "hover:text-primary"
            )}
            onClick={() => setShowMenu(false)}
          >
            Home
          </Link>
          <Link
            href="/designs"
            className={clsx(
              {
                "border-b-2 border-primary text-primary": pathname === "/designs",
              },
              "hover:text-primary"
            )}
            onClick={() => setShowMenu(false)}
          >
            Designs
          </Link>
          <Link
            href="/about-us"
            className={clsx(
              {
                "border-b-2 border-primary text-primary": pathname === "/about-us",
              },
              "hover:text-primary"
            )}
            onClick={() => setShowMenu(false)}
          >
            About us
          </Link>
          <div className="flex items-center justify-between gap-x-4">
            <Button variant="outline" className="rounded-full" onClick={() => dispatch(togglePanel("signup"))}>
              Sign up
            </Button>
            <Button variant="outline" className="rounded-full" onClick={() => dispatch(togglePanel("signin"))}>
              Sign in
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
