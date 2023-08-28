"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/context/hook"
import { setLogin, setLogout, showModal as SM } from "@/context/theme"

import { revalidateVendor } from "@/lib/actions/vendor.actions"
import Modal from "@/components/Modal"

export default function Context() {
  const dispatch = useAppDispatch()
  const showModal = useAppSelector(SM)

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

  return <>{showModal && <Modal />}</>
}
