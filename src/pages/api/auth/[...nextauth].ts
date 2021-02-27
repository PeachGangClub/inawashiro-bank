import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { MyUser } from '../../../interfaces'
import initFirebaseAdmin from '../../../utils/initFirebaseAdmin'

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
      if (!name) return false
      const firebaseAdmin = initFirebaseAdmin()
      const db = firebaseAdmin.firestore()
      const usersRef = db.collection('users')
      let user = null
      await (await usersRef.where('provider', '==', 'twitter').where('uid', '==', id).get()).forEach((userSS) => {
        user = userSS.data()
      })

      if (!user) {
        await usersRef.add({ name, image, hyc: 0, provider: 'twitter', uid: id, credentials: { accessToken, refreshToken } })
      }
      return Promise.resolve(true)
    },
    async session(session: any, token: any) {
      const firebaseAdmin = initFirebaseAdmin()
      const db = firebaseAdmin.firestore()
      let user: MyUser | null = null

      const twitterId = token.sub
      if (twitterId) {
        await (await db.collection('users').where('provider', '==', 'twitter').where('uid', '==', twitterId).get()).forEach(async (userSS) => {
          user = userSS.data() as MyUser
          user.id = userSS.id
          session.user = { id: user.id, name: user.name, image: user.image, hyc: user.hyc ?? 0 }
        })
      }
      return session
    }
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)
