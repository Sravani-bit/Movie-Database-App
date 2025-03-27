import {Component} from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import './index.css'

class UpcomingMovies extends Component {
  state = {upcomingMovies: []}

  componentDidMount() {
    this.getUpcomingMovies()
  }

  getUpcomingMovies = async () => {
    const API_KEY = '4670e61bb1717ae5d71126fbaaffaaea'
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
    )
    if (response.ok) {
      const fetchedMovies = await response.json()
      this.setState({upcomingMovies: fetchedMovies.results})
    }
  }

  render() {
    const {upcomingMovies} = this.state
    return (
      <div>
        <Navbar />
        <h1 data-testid="upcoming-heading">Upcoming Movies</h1>
        <ul className="movies-list">
          {upcomingMovies.map(movie => (
            <li key={movie.id} className="movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <p
                data-testid={`movie-title-${movie.id}`}
                className="movie-title"
              >
                {movie.title}
              </p>
              <p>{movie.vote_average}</p>
              <Link to={`/movie/${movie.id}`}>
                <button className="details-button">View Details</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default UpcomingMovies
