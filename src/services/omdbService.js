import axios from 'axios'

const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const BASE_URL = 'https://www.omdbapi.com/'

if (!API_KEY) {
  // This is a non-fatal warning so the app can still render
  console.warn('VITE_OMDB_API_KEY is not set. OMDB requests will fail until it is configured.')
}

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
})

export async function searchMovies(query) {
  if (!API_KEY) {
    throw new Error('Missing OMDB API key. Please configure VITE_OMDB_API_KEY.')
  }

  try {
    const response = await client.get('/', {
      params: {
        apikey: API_KEY,
        s: query || 'Batman',
        type: 'movie',
      },
    })

    const data = response.data

    if (data.Response === 'False') {
      return {
        movies: [],
        error: data.Error || 'No movies found for this search.',
      }
    }

    return {
      movies: data.Search ?? [],
      error: null,
    }
  } catch (error) {
    console.error('Failed to search movies', error)
    throw new Error('Failed to fetch movies. Please try again.')
  }
}

export async function getMovieDetails(imdbID) {
  if (!API_KEY) {
    throw new Error('Missing OMDB API key. Please configure VITE_OMDB_API_KEY.')
  }

  try {
    const response = await client.get('/', {
      params: {
        apikey: API_KEY,
        i: imdbID,
        plot: 'full',
      },
    })

    const data = response.data

    if (data.Response === 'False') {
      throw new Error(data.Error || 'Movie not found.')
    }

    return data
  } catch (error) {
    console.error('Failed to fetch movie details', error)
    throw new Error('Failed to fetch movie details. Please try again.')
  }
}

