'use client'
import './globals.css'
import { Roboto } from 'next/font/google'
import { Josefin_Sans } from 'next/font/google'
import { ThemeProvider } from './utils/theme-provider'
import { Toaster } from 'react-hot-toast'
import { Providers } from './Provider'

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

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${roboto.variable} ${josefin.variable} !bg-white bg-gradient-to-br from-white to-indigo-300 via-blue-100 bg-no-repeat dark:bg-gradient-to-br dark:from-gray-800 dark:to-indigo-950 dark:via-blue-950 duration-300`}
      >
        <Providers>
          <ThemeProvider>
            {children}
            <Toaster position="top-center" reverseOrder={false} />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
