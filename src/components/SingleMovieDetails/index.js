import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Navbar from '../Navbar'
import './index.css'

class MovieDetails extends Component {
  state = {movieDetails: null, castDetails: []}

  componentDidMount() {
    this.getMovieDetails()
    this.getCastDetails()
  }

  getMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const API_KEY = '4670e61bb1717ae5d71126fbaaffaaea'
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
      )
      if (!response.ok) {
        throw new Error('Failed to fetch movie details')
      }
      const data = await response.json()
      this.setState({movieDetails: data})
    } catch (error) {
      console.error(error)
    }
  }

  getCastDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const API_KEY = '4670e61bb1717ae5d71126fbaaffaaea'
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
      )
      if (!response.ok) {
        throw new Error('Failed to fetch cast details')
      }
      const data = await response.json()
      this.setState({castDetails: data.cast})
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const {movieDetails, castDetails} = this.state

    if (!movieDetails) {
      return <h1>Loading...</h1>
    }

    return (
      <div>
        <Navbar />
        <div className="movie-details-container">
          <div className="movie-info">
            <img
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                  : 'https://via.placeholder.com/300'
              }
              alt={movieDetails.title}
              className="movie-poster"
            />
            <div className="movie-text">
              <h1>{movieDetails.title}</h1>
              <p>
                <strong>⭐ Rating:</strong> {movieDetails.vote_average}
              </p>
              <p>
                <strong>⏳ Duration:</strong> {movieDetails.runtime} min
              </p>
              <p>
                <strong>🎭 Genre:</strong>{' '}
                {movieDetails.genres?.map(g => g.name).join(', ')}
              </p>
              <p>
                <strong>📅 Release Date:</strong> {movieDetails.release_date}
              </p>
              <p>
                <strong>📝 Overview:</strong> {movieDetails.overview}
              </p>
            </div>
          </div>

          <h2>🎭 Cast Details</h2>
          <div className="cast-list">
            {castDetails.map(cast => (
              <div key={cast.id} className="cast-card">
                <img
                  src={
                    cast.profile_path
                      ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
                      : 'https://via.placeholder.com/150'
                  }
                  alt={cast.name}
                  className="cast-image"
                />
                <p className="cast-name">{cast.name}</p>
                <p className="cast-character">as {cast.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(MovieDetails)
