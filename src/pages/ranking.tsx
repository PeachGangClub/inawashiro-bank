import Link from 'next/link'
import Layout from '../components/Layout'
import Ranking from '../components/ranking'

const RankingPage = () => (
  <Layout title="猪苗代銀行">
    <h1 className="title">猪苗代みずうみ銀行</h1>

    <Link href="/about">
      <a>About</a>
    </Link>
    <Ranking />

    <style jsx>{`
      .title {
        color: ${'pink'};
      }
    `}</style>
  </Layout>
)

export default RankingPage
