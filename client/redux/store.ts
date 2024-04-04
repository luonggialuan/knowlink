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

// Call the refresh token function on every page load
// const initializeApp = async () => {
//   await store.dispatch(
//     apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
//   )
//   await store.dispatch(
//     apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
//   )
// }

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

// Function to initialize app
const initializeApp = async () => {
  // await Promise.all([refreshToken(), loadUser()])
  await refreshToken()
  await loadUser()
}

// Set up an interval to check token expiration and refresh it
// const checkTokenExpiration = () => {
//   setInterval(async () => {
//     const { token, user } = store.getState().auth // Assuming your auth slice stores accessToken and user
//     if (token) {
//       // Decode the token to extract expiration time
//       const decodeToken: any = decodedToken(token) // Implement a function to decode JWT token
//       if (decodedToken) {
//         const expiresAt = decodedToken.exp
//         const currentTime = Math.floor(Date.now() / 1000)
//         if (currentTime >= expiresAt) {
//           // Token expired, refresh it
//           await refreshToken()
//         }
//       }
//     }
//   }, 60000) // Check every minute, adjust this interval as needed
// }

initializeApp()
