import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage = () => (
  <Layout title="猪苗代銀行">
    <h1 className="title">猪苗代銀行</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
    <style jsx>{`
      .title {
        color: ${'pink'};
      }
    `}</style>
  </Layout>
)

export default IndexPage
