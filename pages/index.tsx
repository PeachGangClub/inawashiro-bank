import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage = () => (
  <Layout title="猪苗代銀行">
    <h1>猪苗代銀行deploy</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
)

export default IndexPage
