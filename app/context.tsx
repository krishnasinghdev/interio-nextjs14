"use client"

import { useEffect } from "react"
import { useAppDispatch } from "@/context/hook"
import { setLogin, setLogout } from "@/context/theme"

import { revalidateVendor } from "@/lib/actions/vendor.actions"

export default function Context() {
  const dispatch = useAppDispatch()

  const checkLogin = async () => {
    try {
      const vendor = await revalidateVendor()
      vendor && vendor.code === 200 && dispatch(setLogin(vendor))
    } catch (error) {
      dispatch(setLogout())
      console.log("Some Error!", error)
    }
  }

  useEffect(() => {
    checkLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
