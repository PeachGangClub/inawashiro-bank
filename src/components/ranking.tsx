import * as React from 'react'
import useApi from '../hooks/useApi'

type Props = {}

const Ranking = ({}: Props) => {
  const URL = 'https://gist.githubusercontent.com/hsgw/a7874f5f4847af9943d5b93307bc95d3/raw/525212da9bf730bf8198029e2833df2cae5fb021/inawashiro.json'
  const { data } = useApi<Array<{ id: string; name: string; asset: string }>>(URL)
  //データーが指定の方式で取得できていないとき
  if (data === undefined) {
    return <></>
  }
  /* console.log(
    data.find((item) => {
      return item.id === '3'
    })
  )*/
  return (
    <div>
      {data.map((item) => {
        return (
          <p key={item.id}>
            <span style={{ fontSize: 70 }}>{item.name}</span>
            <span>{item.asset}</span>
          </p>
        )
      })}
    </div>
  )
}

export default Ranking
