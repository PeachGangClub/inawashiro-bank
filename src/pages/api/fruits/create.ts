import { NextApiRequest, NextApiResponse } from 'next'
import initFirebaseAdmin from '../../../utils/initFirebaseAdmin'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(400).json({ error: 'bad request' })

  const firebaseAdmin = initFirebaseAdmin()
  const db = firebaseAdmin.firestore()
  const fruitsRef = db.collection('fruits')
  const { name } = req.body
  const result = await fruitsRef.add({ name })
  const fruit = await (await result.get()).data()

  res.status(200).json({ fruit })
}

export default handler
