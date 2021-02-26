import { NextApiRequest, NextApiResponse } from 'next'
import { Fruit } from '../../../interfaces'
import initFirebaseAdmin from '../../../utils/initFirebaseAdmin'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const firebaseAdmin = initFirebaseAdmin()
  const db = firebaseAdmin.firestore()
  const fruitsRef = db.collection('fruits')
  const fruitsSS = await fruitsRef.get()
  const result: Array<Fruit> = []
  fruitsSS.forEach((doc) => {
    result.push({ ...doc.data(), id: doc.id } as Fruit)
  })
  res.status(200).json(result)
}

export default handler
