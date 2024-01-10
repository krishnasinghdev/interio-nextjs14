import { createSlice } from "@reduxjs/toolkit"

import type { RootState } from "./store"

export interface themeState {
  sidebar: boolean
  isLogin: boolean
  showPanel: boolean
  panelFor: string
  vendor: {
    name?: string
    _id?: string
    token?: string
    profilePic?: string
  }
}

const initialState: themeState = {
  sidebar: false,
  isLogin: false,
  showPanel: false,
  panelFor: "",
  vendor: {
    name: "",
    _id: "",
    token: "",
    profilePic: "",
  },
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    togglePanel: (state, actions) => {
      const panelType = actions.payload

      if (panelType === "HIDE") {
        state.showPanel = false
        state.panelFor = ""
      } else {
        state.showPanel = true
        state.panelFor = panelType
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
      const { name, _id, token, profilePic } = actions?.payload
      state.vendor.name = name
      state.vendor._id = _id
      state.vendor.token = token
      state.vendor.profilePic = profilePic

      if (name && _id) {
        localStorage.setItem("vendor", name)
        localStorage.setItem("v_id", _id)
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
export const { showSidebar, hideSidebar, setLogin, setLogout, togglePanel } = themeSlice.actions
export const sidebar = (state: RootState) => state.theme.sidebar
export const isLogin = (state: RootState) => state.theme.isLogin
export const panelFor = (state: RootState) => state.theme.panelFor
export const showPanel = (state: RootState) => state.theme.showPanel
export const vendor = (state: RootState) => state.theme.vendor
export default themeSlice.reducer
