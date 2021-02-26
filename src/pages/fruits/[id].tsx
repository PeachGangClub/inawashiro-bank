import { useRouter } from 'next/router'

import Layout from '../../components/Layout'
import useApi from '../../hooks/useApi'
import { Fruit } from '../../interfaces'

const FruitDetail = () => {
  const router = useRouter()
  const { id } = router.query

  const { data } = useApi<Fruit>(`/api/fruits/${id}`)
  if (!data) {
    return <></>
  }
  return (
    <div>
      <p>id: {data.id}</p>
      <p>名前: {data.name}</p>
    </div>
  )
}

const FruitPage = () => {
  return (
    <Layout title="フルーツ詳細">
      <FruitDetail />
    </Layout>
  )
}
export default FruitPage
