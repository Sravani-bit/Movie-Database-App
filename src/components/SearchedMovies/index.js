import {Component} from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import SearchContext from '../../context/SearchContext'
import './index.css'

class SearchedMovies extends Component {
  state = {
    searchedMovies: [],
    isLoading: false,
    error: null,
  }

  fetchSearchedMovies = async searchInput => {
    if (!searchInput) {
      this.setState({searchedMovies: [], isLoading: false})
      return
    }

    const API_KEY = '4670e61bb1717ae5d71126fbaaffaaea' // Replace with a valid API key
    this.setState({isLoading: true, error: null})

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=1`,
      )
      if (response.ok) {
        const data = await response.json()
        this.setState({searchedMovies: data.results, isLoading: false})
      } else {
        throw new Error('Failed to fetch searched movies')
      }
    } catch (error) {
      this.setState({error: error.message, isLoading: false})
    }
  }

  renderMoviesList = searchedMovies => (
    <ul className="movies-list">
      {searchedMovies.map(movie => (
        <li key={movie.id} className="movie-item">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/150'
            }
            alt={movie.title}
            className="movie-poster"
          />
          <p className="movie-title">{movie.title}</p>
          <p className="movie-rating">⭐ {movie.vote_average}</p>
          <Link to={`/movie/${movie.id}`}>
            <button className="details-button">View Details</button>
          </Link>
        </li>
      ))}
    </ul>
  )

  render() {
    const {searchedMovies, isLoading, error} = this.state

    return (
      <SearchContext.Consumer>
        {({searchInput}) => {
          if (searchInput) {
            this.fetchSearchedMovies(searchInput)
          }

          return (
            <div>
              <Navbar />
              <h1 className="page-title">Search Results for: {searchInput}</h1>

              {isLoading && <p className="loading-text">Loading...</p>}
              {error && <p className="error-text">{error}</p>}

              {searchedMovies.length > 0 ? (
                this.renderMoviesList(searchedMovies)
              ) : (
                <p className="no-results-text">No movies found.</p>
              )}
            </div>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default SearchedMovies
