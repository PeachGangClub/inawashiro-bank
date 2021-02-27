import { useState } from 'react'
import Layout from '../components/Layout'
import useMyUser from '../hooks/useMyUser'

const ChohanPage = () => {
  const [myUser] = useMyUser()
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleClickButton = (yosou: string) => async () => {
    setLoading(true)
    const res = await fetch('/api/games/chohan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        yosou: yosou
      })
    })
    const resBody = await res.json()
    setResult(resBody)
    setLoading(false)
  }

  return (
    <Layout title="丁半">
      <h1 className="title">丁半博打</h1>
      <p>
        <small>一度ログアウトしてもう一度ログインしないとちゃんと動かないかも。それでも動かなかったら言ってください. @anoChick</small>
      </p>
      {myUser ? (
        <>
          <div>
            {result && (
              <>
                <p>
                  {result.dices[0]}, {result.dices[1]}
                </p>
                <p>{result.message}</p>
                <p>+{result.reward} HYC</p>
                <p>所持金: {result.currentHyc}</p>
              </>
            )}
          </div>
          <p>
            <button className="button" disabled={loading} onClick={handleClickButton('cho')}>
              丁
            </button>
            <button className="button" disabled={loading} onClick={handleClickButton('han')}>
              半
            </button>
          </p>
        </>
      ) : (
        <p>ログインしてね。</p>
      )}
      <style jsx>{`
        .button {
          display: inline-block;
          border: 1px solid #aaa;
          border-radius: 8px;
          padding: 8px 24px;
          margin: 0 4px;
          background-color: #fff;
        }
      `}</style>
    </Layout>
  )
}

export default ChohanPage
