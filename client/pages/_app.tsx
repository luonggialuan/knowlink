import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color="#4f46e5" />
      <Component {...pageProps} />
    </>
  )
}
