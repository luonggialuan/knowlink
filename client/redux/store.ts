'use client'
import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './features/api/apiSlice'
import authSlice from './features/auth/authSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})

// Function to refresh token
const refreshToken = async () => {
  await store.dispatch(
    apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
  )
}

// Function to load user data
const loadUser = async () => {
  await store.dispatch(
    apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
  )
}

// Call the refresh token function on every page load
const initializeApp = async () => {
  await refreshToken()
  await loadUser()
}

// Function to initialize app
initializeApp()
