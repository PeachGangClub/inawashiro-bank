import { Provider } from 'next-auth/client'
import { AppProps } from 'next/dist/next-server/lib/router/router'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}
