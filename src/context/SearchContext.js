import React from 'react'

const SearchContext = React.createContext({
  searchInput: '',
  onChangeSearch: () => {},
})

export default SearchContext
