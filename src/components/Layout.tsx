import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import SignInWithTwitterButton from './SignInWithTwitterButton'
import { useSession } from 'next-auth/client'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const [session] = useSession()
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <SignInWithTwitterButton signedIn={!session} />
        <div>
          {session && (
            <div>
              <img src={session.user.image ?? ''} width="48" height="48" />
              {session.user.name}
            </div>
          )}
        </div>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{' '}
          |{' '}
          <Link href="/about">
            <a>About</a>
          </Link>{' '}
          |{' '}
          <Link href="/users">
            <a>Users List</a>
          </Link>{' '}
          |{' '}
          <Link href="/fruits">
            <a>フルーツリスト</a>
          </Link>
          |{' '}
          <Link href="/ranking">
            <a>資産ランキング</a>
          </Link>
        </nav>
      </header>
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  )
}

export default Layout
