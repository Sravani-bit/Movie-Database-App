import {Component} from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import SearchContext from '../../context/SearchContext'
import './index.css'

class Home extends Component {
  state = {moviesList: [], page: 1}

  componentDidMount() {
    this.getPopularMovies()
  }

  componentDidUpdate(prevProps, prevState) {
    const {page} = this.state
    if (prevState.page !== page) {
      this.getUpcomingMovies(page)
    }
  }

  getPopularMovies = async () => {
    const {page} = this.state
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=4670e61bb1717ae5d71126fbaaffaaea&language=en-US&page=${page}`,
    )
    const fetchedData = await response.json()
    this.setState({moviesList: fetchedData.results})
  }

  handlePrevPage = () => {
    this.setState(prevState => ({
      page: prevState.page > 1 ? prevState.page - 1 : 1,
    }))
  }

  handleNextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }

  render() {
    return (
      <SearchContext.Consumer>
        {({searchInput}) => {
          const {moviesList, page} = this.state
          const filteredMoviesList = moviesList.filter(each =>
            each.original_title
              .toLowerCase()
              .includes(searchInput.toLowerCase()),
          )

          return (
            <div>
              <Navbar />
              <h1 className="page-heading">Popular</h1>
              <ul className="movies-list">
                {filteredMoviesList.map(movie => (
                  <li key={movie.id} className="movie-card">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.original_title}
                    />
                    <p className="movie-title">{movie.original_title}</p>
                    <p className="movie-rating">{movie.vote_average}</p>
                    <Link to={`/movie/${movie.id}`}>
                      <button>View Details</button>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="pagination">
                <button
                  className="pagination-btn prev"
                  onClick={this.handlePrevPage}
                  disabled={page === 1}
                >
                  Prev
                </button>
                <p className="page-number">{page}</p>
                <button
                  className="pagination-btn next"
                  onClick={this.handleNextPage}
                >
                  Next
                </button>
              </div>
            </div>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default Home
