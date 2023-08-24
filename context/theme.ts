import { createSlice } from "@reduxjs/toolkit"

import { vendorLogout } from "@/lib/actions/vendor.actions"

// import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "./store"

export interface themeState {
  sidebar: boolean
  isLogin: boolean
  viewSignup: boolean
  viewSignin: boolean
  showModal: boolean
  modalFor: string
  vendor: {
    vendor?: string
    v_id?: string
    token?: string
  }
}

const initialState: themeState = {
  sidebar: false,
  isLogin: false,
  showModal: false,
  modalFor: "",
  viewSignup: false,
  viewSignin: false,
  vendor: {},
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleModal: (state, actions) => {
      const { showModal, modalType } = actions.payload
      state.showModal = showModal
      if (showModal) state.modalFor = modalType
      else state.modalFor = ""
    },
    showSidebar: (state) => {
      state.sidebar = true
    },
    hideSidebar: (state) => {
      state.sidebar = false
    },
    setLogin: (state, actions) => {
      state.isLogin = true
      state.viewSignin = false
      state.vendor = actions?.payload
      const { vendor, token, v_id } = actions?.payload
      if (vendor && token && v_id) {
        localStorage.setItem("vendor", vendor)
        localStorage.setItem("token", token)
        localStorage.setItem("v_id", v_id)
        document.cookie = `token=${token}`
      }
    },
    setLogout: (state, actions) => {
      const { token } = actions?.payload
      console.log(token)
      if (!token) return
      vendorLogout(token)
        .then(() => {
          state.isLogin = false
          localStorage.removeItem("vendor")
          localStorage.removeItem("token")
          localStorage.removeItem("v_id")
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
})

// Action creators are generated for each case reducer function
export const { showSidebar, hideSidebar, setLogin, setLogout, toggleModal } =
  themeSlice.actions
export const sidebar = (state: RootState) => state.theme.sidebar
export const isLogin = (state: RootState) => state.theme.isLogin
export const viewSignup = (state: RootState) => state.theme.viewSignup
export const viewSignin = (state: RootState) => state.theme.viewSignin
export const modalFor = (state: RootState) => state.theme.modalFor
export const showModal = (state: RootState) => state.theme.showModal
export const vendor = (state: RootState) => state.theme.vendor
export default themeSlice.reducer
