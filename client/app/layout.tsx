'use client'
import './globals.css'
import { Roboto } from 'next/font/google'
import { Josefin_Sans } from 'next/font/google'
import { ThemeProvider } from './utils/theme-provider'
import { Toaster } from 'react-hot-toast'
import { Toaster as Toast } from '@/components/ui/toaster'
import { Providers } from './Provider'
import { SessionProvider } from 'next-auth/react'
import React, { FC, useEffect, useState } from 'react'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import Loader from './components/Loader/Loader'
import socketIO from 'socket.io-client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || ''
const socketId = socketIO('http://localhost:8000/', {
  transports: ['websocket']
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-Roboto'
})

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-Josefin'
})

const queryClient = new QueryClient()

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${roboto.variable} ${josefin.variable} !bg-white bg-gradient-to-br from-white to-indigo-300 via-blue-100 bg-no-repeat dark:bg-gradient-to-br dark:from-gray-800 dark:to-indigo-950 dark:via-blue-950`}
      >
        <Providers>
          <QueryClientProvider client={queryClient}>
            <SessionProvider>
              <ThemeProvider>
                <Custom>{children}</Custom>
                <Toaster position="top-center" reverseOrder={false} />
                <Toast />
              </ThemeProvider>
            </SessionProvider>
          </QueryClientProvider>
        </Providers>
      </body>
    </html>
  )
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)

  const { isLoading: queryLoading } = useLoadUserQuery({})

  useEffect(() => {
    if (!queryLoading) {
      setIsLoading(false)
    }
  }, [queryLoading])

  useEffect(() => {
    socketId.on('connection', () => {})
  }, [])

  return <>{isLoading ? <Loader /> : <>{children}</>}</>
}
