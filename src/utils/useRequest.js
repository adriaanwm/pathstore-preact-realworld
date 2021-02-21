import { mergeDeepLeft } from 'ramda'
import { useState, useRef, useEffect } from 'preact/hooks'
import { API_URL } from '/consts'

const useRequestDefault = store => (url, { id, onError, fetchOptions = {}, shouldFetch = true } = {}) => {
  const [result, setResult] = store.use(['requests', id || url])
  const [isLoading, setIsLoading] = useState(false)
  const controllerRef = useRef(null)
  useEffect(
    () => {
      if (!shouldFetch) return
      if (controllerRef.current) controllerRef.current.abort()
      if (!url) {
        setIsLoading(false)
        controllerRef.current = null
        return
      }
      setIsLoading(true)
      controllerRef.current = new AbortController()
      fetch(url, { signal: controllerRef.current.signal, ...fetchOptions })
        .then(res => {
          if (res.status > 299) throw res
          return res.json()
        })
        .then(setResult)
        .catch(err => onError && onError(err))
        .finally(() => setIsLoading(false))
    },
    [id, url]
  )
  return [
    result,
    {
      set: setResult,
      isLoading,
      refresh: () => {
        if (controllerRef.current) controllerRef.current.abort()
        if (!url) {
          setIsLoading(false)
          controllerRef.current = null
          return
        }
        setIsLoading(true)
        controllerRef.current = new AbortController()
        fetch(url, { signal: controllerRef.current.signal, ...fetchOptions })
          .then(res => {
            if (res.status > 299) throw res
            return res.json()
          })
          .then(setResult)
          .catch(err => onError && onError(err))
          .finally(() => setIsLoading(false))
      },
      abort: () => {
        isLoading && setIsLoading(false)
        controllerRef.current && controllerRef.current.abort()
      }
    }
  ]
}

const useRequestConduit = store => (url, { isAuthed = true, ...options }) => {
  const [token] = store.use(['token'])
  const [result, { set, ...rest }] = useRequestDefault(store)(url,
    mergeDeepLeft(
      options,
      (isAuthed && token && { fetchOptions: { headers: { Authorization: `Token ${token}` } } })
    )
  )
  return [
    (result && result.results) ? result.results : result,
    {
      result,
      ...rest,
      set,
      setList: (list) => {
        if (result && Array.isArray(result.results)) {
          set({ ...result, results: list })
        }
        console.warn('Could not update list')
      },
      setListItem: (item, key = 'id') => {
        if (result && Array.isArray(result.results)) {
          const results = result.results
          const index = results.findIndex(x => x[key] === item[key])
          // If item with id exists, replace it, otherwise append this item to the end
          if (index !== -1) {
            set({ ...result, results: [...results.slice(0, index), item, ...results.slice(index + 1)] })
          } else {
            set({ ...result, count: result.count + 1, results: [...results, item] })
          }
        }
      }
    }
  ]
}

const useRequests = [
  {
    match: (url) => url.includes(API_URL),
    useRequest: useRequestConduit
  },
  {
    match: () => true,
    useRequest: useRequestDefault
  }
]

export const useRequest = store => (url, opts = {}) => {
  const { useRequest: matchedUseRequest } = useRequests.find(({ match }) =>
    match(url, opts)
  )
  return matchedUseRequest(store)(url, opts)
}
