import { useEffect, useState } from 'react'

function getCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    for (const key of ['results', 'data', 'items']) {
      if (Array.isArray(payload[key])) {
        return payload[key]
      }
    }
  }

  throw new Error('The API response did not contain a collection of items.')
}

export default function useApiCollection(apiUrl, collectionName) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadItems() {
      try {
        const response = await fetch(apiUrl, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(
            `Unable to load ${collectionName}: ${response.status} ${response.statusText}`,
          )
        }

        const payload = await response.json()
        setItems(getCollection(payload))
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadItems()

    return () => controller.abort()
  }, [apiUrl, collectionName])

  return { items, loading, error }
}
