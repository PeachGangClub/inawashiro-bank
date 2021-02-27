import { signOut } from 'next-auth/client'

const SignOutButton = () => {
  return <button onClick={() => signOut()}>ログアウト</button>
}

export default SignOutButton
