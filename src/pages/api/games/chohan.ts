import { NextApiRequest, NextApiResponse } from 'next'
import random from 'random'
import { getSession } from 'next-auth/client'
import { MyUser } from '../../../interfaces'
import initFirebaseAdmin from '../../../utils/initFirebaseAdmin'

type ChoOrHan = 'cho' | 'han'

const chohan = (yosou: ChoOrHan) => {
  const dices = [random.int(1, 6), random.int(1, 6)] as [number, number]
  const reward = ['cho', 'han'][(dices[0] + dices[1]) % 2] === yosou ? 2 : 0
  const generateMessage = (result: [number, number]) => {
    switch (result.join('')) {
      case '11':
        return 'ピンゾロの丁'
      case '13':
      case '31':
        return 'サンミチの丁'
      case '15':
      case '51':
        return 'グイチの丁'
      case '22':
        return 'ニゾロの丁'
      case '24':
      case '42':
        return 'シニの丁'
      case '26':
      case '62':
        return 'ニロクの丁'
      case '33':
        return 'サンゾロの丁'
      case '35':
      case '53':
        return 'グサンの丁'
      case '44':
        return 'シゾロの丁'
      case '46':
      case '64':
        return 'シロクの丁'
      case '55':
        return 'ゴゾロの丁'
      case '66':
        return 'ロクゾロの丁'
      case '12':
      case '21':
        return 'ピンゾロの半'
      case '14':
      case '41':
        return 'ヨイチの半'
      case '16':
      case '61':
        return 'イチロクの半'
      case '23':
      case '32':
        return 'サニの半'
      case '25':
      case '52':
        return 'グニの半'
      case '34':
      case '43':
        return 'シソウの半'
      case '36':
      case '63':
        return 'サブロクの半'
      case '45':
      case '54':
        return 'グシの半'
      case '56':
      case '65':
        return 'ゴロクの半'
      default:
        return ''
    }
  }

  return {
    dices: dices,
    message: generateMessage(dices),
    reward: reward
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(400).json({ error: 'bad request' })

  const session = ((await getSession({ req })) as unknown) as { user: MyUser | null }
  const firebaseAdmin = initFirebaseAdmin()
  const db = firebaseAdmin.firestore()
  const userRef = db.collection('users').doc(session?.user?.id ?? '')
  const useSS = await userRef.get()
  const user = await useSS.data()
  if (!user) return res.status(401).json({ error: 'unauthorized' })

  const result = chohan(req.body?.yosou ?? 'cho')

  await userRef.set(
    {
      hyc: user.hyc - 1 + result.reward
    },
    { merge: true }
  )
  await userRef.collection('transactions').add({
    serviceProvider: {
      id: 'xxxxx',
      name: '猪苗代銀行'
    },
    title: '丁半博打',
    details: {
      result
    },
    amount: -1 + result.reward
  })
  res.status(200).json({ ...result, currentHyc: user.hyc - 1 + result.reward })
}

export default handler
