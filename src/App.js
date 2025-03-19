import './App.css'
import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import SearchContext from './context/SearchContext'
import Home from './components/Home'
import TopRated from './components/TopRated'
import UpcomingMovies from './components/UpcomingMovies'
// write your code here
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
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/top-rated" component={TopRated} />
          <Route exact path="/upcoming" component={UpcomingMovies} />
        </Switch>
      </SearchContext.Provider>
    )
  }
}

export default App
