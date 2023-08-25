"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/context/hook"
import { setLogin } from "@/context/theme"
import {showModal as SM} from "@/context/theme"
import Modal from "@/components/Modal"

export default function Context() {
  const dispatch = useAppDispatch()
  const showModal = useAppSelector(SM)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const vendor = localStorage.getItem("vendor")
    const v_id = localStorage.getItem("v_id")
    if (token && vendor && v_id) {
      dispatch(
        setLogin({
          vendor,
          v_id,
          token,
        })
      )
    }
  }, [])

  return <>{showModal && <Modal/>}</>
}
