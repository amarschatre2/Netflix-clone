import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getMovieDetails } from '../services/omdbService.js'

const MovieDetails = () => {
  const { imdbID } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isCancelled = false

    const run = async () => {
      setLoading(true)
      setError('')

      try {
        const result = await getMovieDetails(imdbID)
        if (isCancelled) return
        setMovie(result)
      } catch (err) {
        if (isCancelled) return
        setError(err.message || 'Failed to load movie details.')
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
  }, [imdbID])

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner" />
        <p>Loading movie details…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-state">
        <p>{error}</p>
        <p>
          <Link to="/">Go back home</Link>
        </p>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="empty-state">
        <p>No details available for this movie.</p>
        <p>
          <Link to="/">Go back home</Link>
        </p>
      </div>
    )
  }

  const posterSrc =
    movie.Poster && movie.Poster !== 'N/A'
      ? movie.Poster
      : 'https://via.placeholder.com/400x600/111111/ffffff?text=No+Image'

  return (
    <section className="details-layout">
      <div>
        <img src={posterSrc} alt={movie.Title} className="details-poster" />
      </div>

      <div className="details-meta">
        <div>
          <h1 className="details-title">{movie.Title}</h1>
          <p className="details-tagline">
            {movie.Year} • {movie.Rated} • {movie.Runtime}
          </p>
        </div>

        <div className="details-chips">
          {movie.Genre &&
            movie.Genre.split(',').map((genre) => (
              <span key={genre.trim()} className="chip">
                {genre.trim()}
              </span>
            ))}
          {movie.imdbRating && (
            <span className="chip accent">
              IMDb {movie.imdbRating} / 10 ({movie.imdbVotes} votes)
            </span>
          )}
        </div>

        {movie.Plot && (
          <>
            <h2 className="details-section-title">Synopsis</h2>
            <p className="details-section-body">{movie.Plot}</p>
          </>
        )}

        {movie.Director && (
          <>
            <h2 className="details-section-title">Director</h2>
            <p className="details-section-body">{movie.Director}</p>
          </>
        )}

        {movie.Actors && (
          <>
            <h2 className="details-section-title">Cast</h2>
            <p className="details-section-body">{movie.Actors}</p>
          </>
        )}

        {movie.Awards && (
          <>
            <h2 className="details-section-title">Awards</h2>
            <p className="details-section-body">{movie.Awards}</p>
          </>
        )}

        <div className="details-section-body" style={{ marginTop: '1.25rem', fontSize: '0.85rem' }}>
          <Link to="/">← Back to browse</Link>
        </div>
      </div>
    </section>
  )
}

export default MovieDetails

