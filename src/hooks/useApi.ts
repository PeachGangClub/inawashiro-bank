import useSWR from 'swr'

const fetcher = (path: RequestInfo, init?: RequestInit | undefined) => fetch(path, init).then((res) => res.json())

function useApi<T = any, U = any>(path: string) {
  return useSWR<T, U>(path, fetcher)
}

export default useApi
