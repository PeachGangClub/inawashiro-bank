import { NextApiRequest, NextApiResponse } from 'next'
import initFirebaseAdmin from '../../../utils/initFirebaseAdmin'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  if (typeof id !== 'string') return res.status(400).json({ error: 'bad request' })

  const firebaseAdmin = initFirebaseAdmin()
  const db = firebaseAdmin.firestore()
  const fruitRef = db.collection('fruits').doc(id)
  const fruitSS = await fruitRef.get()
  const data = await fruitSS.data()

  res.status(200).json({ id: fruitSS.id, ...data })
}

export default handler
