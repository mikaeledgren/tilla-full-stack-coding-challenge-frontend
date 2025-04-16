import axios from 'axios'
import { useEffect, useState } from 'react'

export const useApiData = <T>(
  path: string,
  defaultValue: any,
  dependencies = [],
  debounceProp = 0
): T => {
  const [data, setData] = useState<T>(defaultValue)
  const [debounce, setDebounce] = useState<NodeJS.Timeout>()

  useEffect(() => {
    const _debounce = setTimeout(() => {
      return axios
        .get<T>(path)
        .catch((err) => err.response)
        .then((response) => {
          setData(response.data)
        })
    }, debounceProp)

    setDebounce(_debounce)

    return () => {
      clearTimeout(_debounce)
    }
  }, dependencies)

  useEffect(() => {
    return () => {
      !!debounce && clearTimeout(debounce)
    }
  }, [])

  return data
}

export default useApiData
