"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useDispatch, useSelector } from "react-redux"

import { modalFor as MF, toggleModal } from "../context/theme"
import EditPassword from "./EditPassword"
import Invite from "./Invite"
import NewCollection from "./NewCollection"
import Signin from "./Signin"
import Signup from "./Signup"

interface PortalProps {
  component: string
  onClick: () => void
}
const Modal = ({ component, onClick }: PortalProps) => {
  const ref = useRef<Element | null>(null)
  const dispatch = useDispatch()
  const modalFor = useSelector(MF)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#modal")
    setMounted(true)
  }, [])

  return mounted && ref.current
    ? createPortal(
        <dialog className="overlay z-10">
          {modalFor === "signup" && (
            <Signup
              onClick={() =>
                dispatch(toggleModal({ showModal: false, modalType: "" }))
              }
            />
          )}
          {modalFor === "signin" && (
            <Signin
              onClick={() =>
                dispatch(toggleModal({ showModal: false, modalType: "" }))
              }
            />
          )}
          {modalFor === "invite" && (
            <Invite
              onClick={() =>
                dispatch(toggleModal({ showModal: false, modalType: "" }))
              }
            />
          )}
          {modalFor === "collection" && (
            <NewCollection
              onClick={() =>
                dispatch(toggleModal({ showModal: false, modalType: "" }))
              }
            />
          )}
          {modalFor === "edit-password" && (
            <EditPassword
              onClick={() =>
                dispatch(toggleModal({ showModal: false, modalType: "" }))
              }
            />
          )}
        </dialog>,
        ref.current
      )
    : null
}

export default Modal
