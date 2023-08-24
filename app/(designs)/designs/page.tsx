"use client"

import { useEffect, useState } from "react"
import { Metadata } from "next"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/context/hook"
import { isLogin, toggleModal } from "@/context/theme"
import { DUMMYSHOT } from "@/utils/dummy"

import { shotData } from "@/types/shotType"
import { getShot } from "@/lib/actions/shot.actions"
import DesignList from "@/components/DesignList"

export const metadata: Metadata = {
  title: "Interior Design ",
  description: "Interior Design Shots, Get Inspired By Other Designer's Works",
}

export default function Designs() {
  const loginStatus = useAppSelector(isLogin)
  const dispatch = useAppDispatch()
  const [shots, setShots] = useState<shotData[]>([])

  const fetchshots = async () => {
    try {
      const data = await getShot()
      if (data) {
        setShots(data.shots as shotData[])
      }
    } catch (error) {
      setShots(DUMMYSHOT)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchshots()
  }, [])

  return (
    <>
      {/* LOGO + BUTTON */}
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
      <div className="my-4 w-full"></div>
      {shots?.length > 0 ? (
        <DesignList shots={shots} />
      ) : (
        <p className="text-center">Nothing to show!</p>
      )}
    </>
  )
}
