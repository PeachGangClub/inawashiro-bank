import Link from 'next/link'
import React from 'react'
import { mutate } from 'swr'

import Layout from '../../components/Layout'
import useApi from '../../hooks/useApi'
import { Fruit } from '../../interfaces'

const FruitList = () => {
  const { data } = useApi<Array<Fruit>>('/api/fruits')

  if (!data) {
    return <></>
  }
  return (
    <ul>
      {data.map((d) => {
        return (
          <li key={d.id}>
            <Link href={`/fruits/${d.id}`}>
              <a>{d.name}</a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

const FruitsIndexPage = () => {
  const handleClickButton = async () => {
    await fetch('/api/fruits/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'もも'
      })
    })
    mutate('/api/fruits')
  }

  return (
    <Layout title="フルーツリスト">
      <h1>フルーツリスト</h1>
      <FruitList />
      <button onClick={handleClickButton}>追加</button>
    </Layout>
  )
}
export default FruitsIndexPage
