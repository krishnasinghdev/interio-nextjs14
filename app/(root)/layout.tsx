"use client"

import React from "react"
import { modalFor as MF, showModal as SM, toggleModal } from "@/context/theme"
import { useDispatch, useSelector } from "react-redux"

import Modal from "@/components/Modal"
import Navbar from "@/components/Navbar"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const dispatch = useDispatch()

  const modalFor = useSelector(MF)
  const showModal = useSelector(SM)
  return (
    <>
      {showModal && (
        <Modal
          onClick={() =>
            dispatch(toggleModal({ showModal: false, modalType: "" }))
          }
          component={modalFor}
        />
      )}
      <Navbar />
      {children}
    </>
  )
}
