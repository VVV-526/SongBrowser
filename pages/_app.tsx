import '../styles/globals.css'
import '../styles/global.scss'
import type { AppProps } from 'next/app'
import AuthUserProvider from "../components/auth/AuthUserProvider"

function MyApp({ Component, pageProps }: AppProps) {
  return (<AuthUserProvider> <Component {...pageProps} /></AuthUserProvider>)
}

export default MyApp
