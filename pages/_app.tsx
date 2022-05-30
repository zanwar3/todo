import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import {Fragment} from 'react'
import Navigation from '../components/navigation'
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps:{session,...pageProps} }: AppProps) {
  return(
    <SessionProvider session={session}>
        <Fragment>
          <Navigation/>
          <Component {...pageProps} />
      </Fragment>
      </SessionProvider>
  )
}

export default MyApp
