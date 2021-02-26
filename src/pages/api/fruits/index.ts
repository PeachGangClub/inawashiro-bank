import { NextApiRequest, NextApiResponse } from 'next'
import initFirebaseAdmin from '../../../utils/initFirebaseAdmin'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const firebaseAdmin = initFirebaseAdmin()
  const db = firebaseAdmin.firestore()
  const fruitsRef = db.collection('fruits')
  const fruitsSS = await fruitsRef.get()
  const result: Array<{ name: string }> = []
  fruitsSS.forEach((doc) => {
    result.push(doc.data() as { name: string })
  })
  res.status(200).json(result)
}

export default handler
