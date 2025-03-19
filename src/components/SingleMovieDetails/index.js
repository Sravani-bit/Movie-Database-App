import {Component} from 'react'
import Navbar from '../Navbar'

class SingleMovieDetails extends Component {
  state = {movieData: {}}

  componentDidMount() {
    this.getSingleMovieDetails()
  }

  getSingleMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=85d472ad3ec3dbd7c374fe3f5d932f40&language=en-US`,
    )
    const singleMovieDetails = await response.json()
    console.log(singleMovieDetails)

    this.setState({movieData: singleMovieDetails})
  }

  render() {
    const {movieData} = this.state
    return (
      <div>
        <Navbar />
        <div>
          <h1>Happy</h1>
        </div>
      </div>
    )
  }
}

export default SingleMovieDetails
