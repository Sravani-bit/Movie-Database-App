import {Link} from 'react-router-dom'
import {Component} from 'react'
import SearchContext from '../../context/SearchContext'

const Navbar = () => (
  <SearchContext.Consumer>
    {value => {
      const {onChangeSearch} = value
      const onChangeSearchEvent = event => {
        onChangeSearch(event.target.value)
      }

      return (
        <nav className="nav-header">
          <div className="nav-content">
            <h1 className="website_logo">movieDB</h1>
            <ul className="navigation_buttons">
              <Link to="/">
                <li>
                  <button type="button">Popular</button>
                </li>
              </Link>
              <Link to="/top-rated">
                <li>
                  <button type="button">Top Rated</button>
                </li>
              </Link>
              <Link to="/upcoming">
                <li>
                  <button type="button">Upcoming</button>
                </li>
              </Link>
            </ul>
            <div className="search-container">
              <input type="search" onChange={onChangeSearchEvent} />
              <button type="button">Search</button>
            </div>
          </div>
        </nav>
      )
    }}
  </SearchContext.Consumer>
)

export default Navbar
