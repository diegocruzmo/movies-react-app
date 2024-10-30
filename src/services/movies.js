const API_KEY = '7e10a111'

export const fetchMovies = async ({ input }) => {
  if (input === '') return null

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${input}`
    )
    const data = await res.json()
    const movies = data?.Search

    const mappedMovies = movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))

    return mappedMovies
  } catch (error) {
    console.log(error)
  }
}
