import { useSession } from 'next-auth/client'
import { MyUser } from '../interfaces'

function useMyUser(): [MyUser | null, boolean] {
  const [session, loading] = useSession()
  const user = (session?.user ?? null) as MyUser | null

  return [user, loading]
}

export default useMyUser
