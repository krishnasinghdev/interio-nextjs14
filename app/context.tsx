"use client"

import { useEffect } from "react"
import { useAppDispatch } from "@/context/hook"
import { setLogin } from "@/context/theme"

export default function Context() {
  const dispatch = useAppDispatch()

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

  return <span></span>
}
