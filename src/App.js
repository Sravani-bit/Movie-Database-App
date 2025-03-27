import './App.css'
import {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import SearchContext from './context/SearchContext'
import Navbar from './components/Navbar'
import Home from './components/Home'
import TopRated from './components/TopRated'
import UpcomingMovies from './components/UpcomingMovies'
import SingleMovieDetails from './components/SingleMovieDetails'
import SearchedMovies from './components/SearchedMovies'

class App extends Component {
  state = {searchInput: ''}

  onChangeSearch = value => {
    this.setState({searchInput: value})
  }

  render() {
    const {searchInput} = this.state
    return (
      <SearchContext.Provider
        value={{searchInput, onChangeSearch: this.onChangeSearch}}
      >
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/top-rated" component={TopRated} />
            <Route exact path="/upcoming" component={UpcomingMovies} />
            <Route exact path="/movie/:id" component={SingleMovieDetails} />
            <Route exact path="/search" component={SearchedMovies} />
          </Switch>
        </Router>
      </SearchContext.Provider>
    )
  }
}

export default App
