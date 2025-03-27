import {Component} from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import SearchContext from '../../context/SearchContext'
import './index.css'

class Home extends Component {
  state = {moviesList: []}

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=4670e61bb1717ae5d71126fbaaffaaea&language=en-US&page=1`,
    )
    const fetchedData = await response.json()
    this.setState({moviesList: fetchedData.results})
  }

  render() {
    return (
      <SearchContext.Consumer>
        {({searchInput}) => {
          const {moviesList} = this.state
          const filteredMoviesList = moviesList.filter(each =>
            each.original_title
              .toLowerCase()
              .includes(searchInput.toLowerCase()),
          )
          return (
            <div>
              <Navbar />
              <h1>Popular Movies</h1>
              <ul className="movies-list">
                {filteredMoviesList.map(movie => (
                  <li key={movie.id} className="movie-card">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.original_title}
                    />
                    <p>{movie.original_title}</p>
                    <p>{movie.vote_average}</p>
                    <Link to={`/movie/${movie.id}`}>
                      <button>View Details</button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default Home
