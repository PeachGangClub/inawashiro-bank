import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import SignInWithTwitterButton from './SignInWithTwitterButton'
import useMyUser from '../hooks/useMyUser'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const [myUser] = useMyUser()
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <SignInWithTwitterButton signedIn={!myUser} />
        <div>
          {myUser && (
            <div>
              <img src={myUser.image ?? ''} width="48" height="48" />
              {myUser.name}
              <br />
              所持HYC: {myUser.hyc}
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
