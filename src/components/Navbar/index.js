import {Component} from 'react'
import {Link} from 'react-router-dom'
import SearchContext from '../../context/SearchContext'
import './index.css'

class Navbar extends Component {
  render() {
    return (
      <SearchContext.Consumer>
        {({searchInput, updateSearchInput, searchMovies}) => (
          <nav className="navbar">
            <div className="nav-logo">
              <h1>
                <Link to="/">🎬 MovieDB</Link>
              </h1>
            </div>

            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search for movies..."
                value={searchInput}
                onChange={e => updateSearchInput(e.target.value)}
              />
              <button className="search-button" onClick={searchMovies}>
                Search
              </button>
            </div>

            <ul className="nav-links">
              <li>
                <Link to="/">Popular</Link>
              </li>
              <li>
                <Link to="/top-rated">Top Rated</Link>
              </li>
              <li>
                <Link to="/upcoming">Upcoming</Link>
              </li>
            </ul>
          </nav>
        )}
      </SearchContext.Consumer>
    )
  }
}

export default Navbar
