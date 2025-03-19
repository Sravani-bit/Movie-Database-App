import {Component} from 'react'
import {Link} from 'react-router-dom'
import SearchContext from '../../context/SearchContext'
import Navbar from '../Navbar'

class TopRated extends Component {
  state = {topRatedMoviesList: []}

  componentDidMount() {
    this.gettopRatedMoviesList()
  }

  gettopRatedMoviesList = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?api_key=85d472ad3ec3dbd7c374fe3f5d932f40&language=en-US&page=1',
    )
    const fetchedList = await response.json()
    console.log(fetchedList)
    this.setState({topRatedMoviesList: fetchedList.results})
  }

  render() {
    return (
      <SearchContext.Consumer>
        {({searchInput}) => {
          const {topRatedMoviesList} = this.state
          const filteredTopRated = topRatedMoviesList.filter(each =>
            each.original_title
              .toLowerCase()
              .includes(searchInput.toLowerCase()),
          )
          return (
            <div>
              <Navbar />
              <h1>Top Rated Movies</h1>
              <ul>
                {filteredTopRated.map(movie => (
                  <li key={movie.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.original_title}
                    />

                    <p>{movie.title}</p>
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

export default TopRated
