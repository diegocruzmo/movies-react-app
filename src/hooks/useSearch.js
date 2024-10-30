import { useState, useEffect, useRef } from 'react'

export function useSearch() {
  const [input, setInput] = useState('')
  const [error, setError] = useState(null)

  const firstInput = useRef(true)

  const updateValue = (value) => {
    setInput(value)
  }

  useEffect(() => {
    if (firstInput.current) {
      firstInput.current = input === ''
      return
    }

    if (input === '') {
      setError('Search can not be empty')
      return
    }

    if (input.length < 3) {
      setError('Please type 3 characters minimum')
      return
    }

    setError(null)
  }, [input])

  return { input, error, updateValue }
}
