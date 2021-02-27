import { signIn, signOut } from 'next-auth/client'

const SignInWithTwitterButton = ({ signedIn }: { signedIn: boolean }) => {
  if (!signedIn) return <button onClick={() => signOut()}>ログアウト</button>

  return <button onClick={() => signIn('twitter')}>Twitterでログイン</button>
}

export default SignInWithTwitterButton
