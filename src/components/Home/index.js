import {Component} from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import SearchContext from '../../context/SearchContext'

class Home extends Component {
  state = {moviesList: []}

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=85d472ad3ec3dbd7c374fe3f5d932f40&language=en-US&page=1`,
    )
    const fetchedData = await response.json()
    console.log(fetchedData.results)
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
              <h1>Popular</h1>
              <ul>
                {filteredMoviesList.map(movie => (
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
export default Home
