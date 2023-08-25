"use client"

import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/context/hook"
import { isLogin, toggleModal } from "@/context/theme"

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
            <Link
              href="/designs/upload"
              className="mr-4 rounded bg-primary px-4 py-2"
            >
              Upload Shot
            </Link>
          ) : (
            <>
              <button
                className="mr-4 rounded bg-primary px-4 py-2"
                onClick={() =>
                  dispatch(
                    toggleModal({ showModal: true, modalType: "signup" })
                  )
                }
              >
                Sign up
              </button>
              <button
                className="rounded bg-trans px-4 py-2"
                onClick={() =>
                  dispatch(
                    toggleModal({ showModal: true, modalType: "signin" })
                  )
                }
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>

      {/* SEARCH + TAGS */}
      <div className="my-4 w-full">
        <input
          type="text"
          placeholder="Search for anything ..."
          className="w-full rounded bg-trans px-4 py-2  "
        />
        <div className="mt-4 flex gap-4 overflow-x-auto pb-4">
          <button className="whitespace-nowrap rounded bg-primary px-4 py-2 ">
            Modern
          </button>
          <button className="whitespace-nowrap rounded bg-trans px-4 py-2 ">
            Minimal
          </button>
          <button className="whitespace-nowrap rounded bg-trans px-4 py-2">
            Dark Theme
          </button>
          <button className="whitespace-nowrap rounded bg-trans px-4 py-2 ">
            Hotel Room
          </button>
          <button className="whitespace-nowrap rounded bg-trans px-4 py-2 ">
            Luxurious
          </button>
          <button className="whitespace-nowrap rounded bg-trans px-4 py-2 ">
            Space Saving
          </button>
        </div>
      </div>
    </>
  )
}
