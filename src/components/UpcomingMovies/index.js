import {Component} from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import SearchContext from '../../context/SearchContext'

class UpcomingMovies extends Component {
  state = {upcomingMovies: []}

  componentDidMount() {
    this.getupcomingMovies()
  }

  getupcomingMovies = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/upcoming?api_key=85d472ad3ec3dbd7c374fe3f5d932f40&language=en-US&page=1',
    )
    const fetchedMovies = await response.json()
    console.log(fetchedMovies.results)
    this.setState({upcomingMovies: fetchedMovies.results})
  }

  render() {
    return (
      <SearchContext.Consumer>
        {({searchInput}) => {
          const {upcomingMovies} = this.state
          const searchedUpcomigMovies = upcomingMovies.filter(each =>
            each.original_title
              .toLowerCase()
              .includes(searchInput.toLowerCase()),
          )

          return (
            <div>
              <Navbar />
              <h1>Upcoming Movies</h1>
              <ul>
                {searchedUpcomigMovies.map(movie => (
                  <li key={movie.id}>
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

export default UpcomingMovies
