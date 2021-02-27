import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { SessionBase } from 'next-auth/_utils'

interface AuthUser {
  name?: string | null
  email?: string | null
  image?: string | null
}
// NextAuth に渡すオプション
const options = {
  // 認証プロバイダー
  providers: [
    Providers.Twitter({
      clientId: process.env.TWITTER_CLIENT_ID ?? '',
      clientSecret: process.env.TWITTER_CLIENT_SECRET ?? ''
    })
  ],
  callbacks: {
    signIn: async ({ id, name, image }: { id: string; name: string; image: string }, { accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
      console.log(id, name, image)
      console.log(accessToken, refreshToken)
      if (!name) return false
      // const firebaseAdmin = initFirebaseAdmin()
      // const db = firebaseAdmin.firestore()
      // const usersRef = db.collection('users')
      // const result = await usersRef.add({ name, image, provider: 'twitter', uid: id, credentials: { accessToken, refreshToken } })
      return Promise.resolve(true)
    },
    async session(session: SessionBase, _user: AuthUser) {
      return session
    }
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)
