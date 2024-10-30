//import results from '../mocks/results.json'
import { useState, useRef, useMemo, useCallback } from 'react'
import { fetchMovies } from '../services/movies'

export function useMovies({ input, order }) {
  const [responseMovies, setResponseMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(null)

  const getMovies = useCallback(
    async ({ input }) => {
      //console.log('rendercallback')
      if (previousSearch.current === input) return
      try {
        setLoading(true)
        setError(null)
        previousSearch.current = input
        const data = await fetchMovies({ input })
        setResponseMovies(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    },
    [input]
  )

  const sortedMovies = useMemo(() => {
    //console.log('memorender')
    return order
      ? [...responseMovies].sort((a, b) => a.title.localeCompare(b.title))
      : responseMovies
  }, [order, responseMovies])

  return { movies: sortedMovies, getMovies, loading, error }
}
