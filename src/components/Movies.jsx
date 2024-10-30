const MoviesList = ({ movies }) => {
  return (
    <>
      <ul className='movies list-unstyled'>
        {movies.map((movie) => (
          <li
            className='border rounded movie d-flex flex-column justify-content-center align-items-center pt-1'
            key={movie.id}
          >
            <img className='mb-2' src={movie.poster} alt={movie.title} />
            <h5 className='text-center'>{movie.title}</h5>
            <p>{movie.year}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

const NoMovies = () => {
  return <p>No results...</p>
}

const Movies = ({ movies }) => {
  const hasMovies = movies?.length > 0

  return hasMovies ? <MoviesList movies={movies} /> : <NoMovies />
}

export default Movies
