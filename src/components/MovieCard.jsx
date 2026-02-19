import { Link } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  const { imdbID, Poster, Title, Year } = movie

  const posterSrc =
    Poster && Poster !== 'N/A'
      ? Poster
      : 'https://via.placeholder.com/300x450/111111/ffffff?text=No+Image'

  return (
    <Link to={`/movie/${imdbID}`} className="movie-card">
      <img src={posterSrc} alt={Title} className="movie-card-poster" loading="lazy" />
      <div className="movie-card-body">
        <h3 className="movie-card-title" title={Title}>
          {Title}
        </h3>
        <p className="movie-card-meta">{Year}</p>
      </div>
    </Link>
  )
}

export default MovieCard

