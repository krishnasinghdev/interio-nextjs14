"use client"

import React, { ReactNode } from "react"
import { store } from "@/context/store"
import { Provider } from "react-redux"

type ReduxProviderType = {
  children: ReactNode
}

function ReduxProvider({ children }: ReduxProviderType) {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
