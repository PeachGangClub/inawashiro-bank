import Link from 'next/link'

import Layout from '../../components/Layout'
import List from '../../components/List'
import useApi from '../../hooks/useApi'

const UserList = () => {
  const { data } = useApi('/api/users')
  return data ? <List items={data} /> : <></>
}

const UsersIndexPage = () => (
  <Layout title="Users List | Next.js + TypeScript Example">
    <h1>ユーザー一覧</h1>
    <UserList />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)

export default UsersIndexPage
