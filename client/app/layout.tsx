import './globals.css'
import { Roboto } from 'next/font/google'
import { Josefin_Sans } from 'next/font/google'
import { ThemeProvider } from './utils/theme-provider'

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
        className={`${roboto.variable} ${josefin.variable} !bg-white bg-gradient-to-r from-white to-indigo-100 via-blue-100 bg-no-repeat dark:bg-gradient-to-r dark:from-gray-800 dark:to-indigo-950 dark:via-blue-950 duration-300`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
