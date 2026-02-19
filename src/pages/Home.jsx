import { useEffect, useMemo, useState } from 'react'
import MovieCard from '../components/MovieCard.jsx'
import { searchMovies } from '../services/omdbService.js'

const SKELETON_COUNT = 10

const Home = ({ searchTerm }) => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const queryLabel = useMemo(() => searchTerm || 'Batman', [searchTerm])

  useEffect(() => {
    let isCancelled = false

    const run = async () => {
      setLoading(true)
      setError('')

      try {
        const { movies: results, error: apiError } = await searchMovies(searchTerm)
        if (isCancelled) return

        if (apiError) {
          setError(apiError)
        }
        setMovies(results)
      } catch (err) {
        if (isCancelled) return
        setError(err.message || 'Something went wrong while fetching movies.')
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    run()

    return () => {
      isCancelled = true
    }
  }, [searchTerm])

  const skeletons = Array.from({ length: SKELETON_COUNT })

  return (
    <>
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-kicker">Unlimited movies</p>
          <h1 className="hero-title">Watch something extraordinary tonight.</h1>
          <p className="hero-subtitle">
            Dive into a curated selection of movies powered by the OMDB API. Use the search bar above to explore your
            favourites.
          </p>
          <div className="hero-actions">
            <button type="button" className="btn-primary">
              Start watching
            </button>
            <button type="button" className="btn-secondary">
              Add to list
            </button>
          </div>
          <p className="hero-meta">Now browsing results for &ldquo;{queryLabel}&rdquo;</p>
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2 className="section-title">Trending now</h2>
          <p className="section-subtitle">Results powered by OMDB</p>
        </div>

        {loading && (
          <div className="movie-grid">
            {skeletons.map((_, index) => (
              <div key={index} className="movie-card skeleton">
                <div className="movie-card-poster" />
                <div className="movie-card-body">
                  <div className="skeleton-line medium" />
                  <div className="skeleton-line short" style={{ marginTop: '0.4rem' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="error-state">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="empty-state">
            <p>No movies matched your search.</p>
            <p>Try searching for a different title.</p>
          </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}

export default Home

