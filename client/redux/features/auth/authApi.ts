import { apiSlice } from '../api/apiSlice'
import {
  useForgotPassword,
  useResetPassword,
  userLoggedIn,
  userLoggedOut,
  userRegistration
} from './authSlice'

type RegistrationResponse = {
  message: string
  activationToken: string
}

type RegistrationData = {}

type ForgotPassResponse = {
  message: string
  activationToken: string
}

type ForgotPassData = {}

type ResetPasswordResponse = { message: string; activationToken: string }

type ResetPasswordData = { newPassword: string }

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //endpoints here
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: 'registration',
        method: 'POST',
        body: data,
        credentials: 'include' as const
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          dispatch(
            userRegistration({
              token: result.data.activationToken
            })
          )
        } catch (error: any) {
          console.log(error)
        }
      }
    }),
    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: 'activate-user',
        method: 'POST',
        body: {
          activation_token,
          activation_code
        }
      })
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: 'login',
        method: 'POST',
        body: {
          email,
          password
        },
        credentials: 'include' as const
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user
            })
          )
        } catch (error: any) {
          console.log(error)
        }
      }
    }),
    socialAuth: builder.mutation({
      query: ({ email, name, avatar }) => ({
        url: 'social-auth',
        method: 'POST',
        body: {
          email,
          name,
          avatar
        },
        credentials: 'include' as const
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user
            })
          )
        } catch (error: any) {
          console.log(error)
        }
      }
    }),
    logOut: builder.query({
      query: () => ({
        url: 'logout',
        method: 'GET',
        credentials: 'include' as const
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut())
        } catch (error: any) {
          console.log(error)
        }
      }
    }),
    forgotPassword: builder.mutation<ForgotPassResponse, ForgotPassData>({
      query: (data) => ({
        url: 'forgot-password',
        method: 'POST',
        body: data,
        credentials: 'include' as const
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          // eslint-disable-next-line react-hooks/rules-of-hooks
          dispatch(useForgotPassword({ token: result.data.activationToken }))
        } catch (error: any) {
          console.log(error)
        }
      }
    }),
    activeResetPassword: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: 'active-reset-password',
        method: 'POST',
        body: {
          activation_token,
          activation_code
        }
      })
    }),
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordData>({
      query: (data) => ({
        url: 'reset-password',
        method: 'POST',
        body: data,
        credentials: 'include' as const
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          // eslint-disable-next-line react-hooks/rules-of-hooks
          dispatch(useResetPassword({ token: result.data.activationToken }))
        } catch (error: any) {
          console.log(error)
        }
      }
    })
  })
})

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogOutQuery,
  useForgotPasswordMutation,
  useActiveResetPasswordMutation,
  useResetPasswordMutation
} = authApi
