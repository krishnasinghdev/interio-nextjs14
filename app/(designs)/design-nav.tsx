"use client"

import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/context/hook"
import { isLogin, toggleModal } from "@/context/theme"

import { Button } from "@/components/ui/button"

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
              <button className="mr-4 rounded bg-primary px-4 py-2" onClick={() => dispatch(toggleModal("signup"))}>
                Sign up
              </button>
              <button className="bg-trans rounded px-4 py-2" onClick={() => dispatch(toggleModal("signin"))}>
                Sign in
              </button>
            </>
          )}
        </p>
      </div>

      {/* SEARCH + TAGS */}
      <div className="my-4 w-full">
        <input type="text" placeholder="Search for anything ..." className="bg-trans w-full rounded px-4 py-2  " />
        <div className="mt-4 flex gap-4 overflow-x-auto pb-4">
          <Button>Minimal</Button>
          <Button>Luxurious</Button>
          <Button>Space Saving</Button>
        </div>
      </div>
    </>
  )
}
