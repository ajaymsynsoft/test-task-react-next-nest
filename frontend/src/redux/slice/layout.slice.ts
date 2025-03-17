import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileDTO } from '@/dto'
import { removeCookie } from '@/utils'

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    isWebsiteLoading: true,
    fullPageLoader: false,
    profile: {} as ProfileDTO,
    sidebarDrawer: false,
    isLoggedIn: false,
  },
  reducers: {
    setWebsiteLoader: (state, action: PayloadAction<boolean>) => {
      state.isWebsiteLoading = action.payload
    },

    setFullPageLoader: (state, action: PayloadAction<boolean>) => {
      state.fullPageLoader = action.payload
    },

    setSidebarDrawer: (state, action: PayloadAction<boolean>) => {
      state.sidebarDrawer = action.payload
    },
    handleWebsiteLoader: (state, action: PayloadAction<boolean>) => {
      state.isWebsiteLoading = action.payload
    },

    updateProfile: (state, action: PayloadAction<ProfileDTO>) => {
      state.profile = action.payload
    },

    updateLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },

    handleLogout: () => {
      removeCookie('token')
      window.location.replace('/')
    },
  },
})

export const { setWebsiteLoader, setFullPageLoader, setSidebarDrawer, handleLogout, updateLoggedIn, updateProfile } = layoutSlice.actions
