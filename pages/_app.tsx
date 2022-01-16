import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'

// from pageProps we are extracting session
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      {/* wrapping our child components with the HighOrder component [SessionProvider], so that we can use "useSession()" function in our child*/}

      {/* ALSO wraping with RecoilRoot for global store */}
      {/* In Recoil we have atom which represent store; eg we have userAtom which will store the users data only */}
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
