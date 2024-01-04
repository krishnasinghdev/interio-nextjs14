"use client"

import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/context/hook"
import { isLogin, togglePanel } from "@/context/theme"
import { cn } from "@/utils"
import { SHOTDATA } from "@/utils/dummy"

import { buttonVariants } from "@/components/ui/button"

export default function DesignNav() {
  const loginStatus = useAppSelector(isLogin)
  const dispatch = useAppDispatch()

  return (
    <>
      <div className="flex items-center justify-between">
        <Link href="/" className="font-bold tracking-wider ">
          Interio
        </Link>
        <p>
          {loginStatus ? (
            <Link href="/designs/upload" className="mr-4 rounded bg-primary px-4 py-2">
              Upload Shot
            </Link>
          ) : (
            <>
              <button className="mr-4 rounded bg-primary px-4 py-2" onClick={() => dispatch(togglePanel("signup"))}>
                Sign up
              </button>
              <button className="rounded bg-secondary px-4 py-2" onClick={() => dispatch(togglePanel("signin"))}>
                Sign in
              </button>
            </>
          )}
        </p>
      </div>

      {/* SEARCH + TAGS */}
      <div className="my-4 w-full">
        <input type="text" placeholder="Search for anything ..." className="w-full rounded bg-secondary px-4 py-2  " />
        <div className="mt-4 flex gap-4 overflow-x-auto pb-4">
          {SHOTDATA.map((_, i) => (
            <Link href={`/designs?type=${_.type}`} className={cn(buttonVariants({ variant: "default" }))} key={i}>
              {_.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
