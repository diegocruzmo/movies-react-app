import Movies from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import { useState, useCallback } from 'react'
import debounce from 'just-debounce-it'

function App() {
  const [order, setOrder] = useState(false)
  const { input, error, updateValue } = useSearch()
  const { movies, getMovies, loading } = useMovies({ order })

  const debouncedGetMovies = useCallback(
    debounce((input) => {
      console.log('input', input)
      getMovies({ input })
    }, 300),
    [getMovies]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies({ input })
  }

  const handleCheckbox = () => {
    setOrder(!order)
  }

  const handleChange = (e) => {
    const newInput = e.target.value
    updateValue(newInput)
    debouncedGetMovies(newInput)
  }

  return (
    <>
      <header className='container container-fluid'>
        <h2 className='text-center'>Movies App</h2>
        <form
          onSubmit={handleSubmit}
          className='d-flex justify-content-center align-items-center'
        >
          <div className='w-50'>
            <input
              type='text'
              className='form-control'
              id='input_text'
              name='input_text'
              placeholder='Avengers, Matrix, Spiderman...'
              value={input}
              onChange={handleChange}
            />
          </div>
          <input
            className='ms-2'
            type='checkbox'
            onChange={handleCheckbox}
            value={order}
          />

          <button type='submit' className='btn btn-primary ms-2'>
            Submit
          </button>
        </form>
        {error && (
          <div className='d-flex justify-content-center align-items-center '>
            <div className='w-50'>
              <p className='rounded text-center text-bg-warning mt-3'>
                {error}
              </p>
            </div>
          </div>
        )}
      </header>

      <hr className='container container-fluid' />

      <main className='container container-fuid d-flex justify-content-center align-items-center'>
        {loading ? <p>Loading...</p> : <Movies movies={movies}></Movies>}
      </main>
    </>
  )
}

export default App
