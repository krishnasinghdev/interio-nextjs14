import { createSlice } from "@reduxjs/toolkit"

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
      const modalType = actions.payload

      if (modalType === "HIDE") {
        state.viewSignin = false
        state.viewSignup = false
      }
      if (modalType === "signin") {
        state.viewSignin = true
      }
      if (modalType === "signup") {
        state.viewSignup = true
      }
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
      const { vendor, v_id } = actions?.payload
      if (vendor && v_id) {
        localStorage.setItem("vendor", vendor)
        localStorage.setItem("v_id", v_id)
      }
    },
    setLogout: (state) => {
      state.isLogin = false
      localStorage.removeItem("vendor")
      localStorage.removeItem("v_id")
    },
  },
})

// Action creators are generated for each case reducer function
export const { showSidebar, hideSidebar, setLogin, setLogout, toggleModal } = themeSlice.actions
export const sidebar = (state: RootState) => state.theme.sidebar
export const isLogin = (state: RootState) => state.theme.isLogin
export const viewSignup = (state: RootState) => state.theme.viewSignup
export const viewSignin = (state: RootState) => state.theme.viewSignin
export const modalFor = (state: RootState) => state.theme.modalFor
export const showModal = (state: RootState) => state.theme.showModal
export const vendor = (state: RootState) => state.theme.vendor
export default themeSlice.reducer
