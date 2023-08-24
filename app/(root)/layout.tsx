"use client"

import { useAppDispatch, useAppSelector } from "@/context/hook"
import { modalFor as MF, showModal as SM, toggleModal } from "@/context/theme"

import Modal from "@/components/Modal"
import Navbar from "@/components/Navbar"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const dispatch = useAppDispatch()

  const modalFor = useAppSelector(MF)
  const showModal = useAppSelector(SM)
  return (
    <>
      <Navbar />
      {showModal && (
        <Modal
          onClick={() =>
            dispatch(toggleModal({ showModal: false, modalType: "" }))
          }
          component={modalFor}
        />
      )}
      {children}
    </>
  )
}
