import React, { useState } from "react"
import './searchBar.scss'
import '../global.scss'

const SearchBar = ({handleSearch}) => {
  const [word, setWord] = useState('')

  const handleInputChange = (e)=> {
    setWord(e.target.value)
  }

  return(
    <form className="search-elements-container">
      <div className="form-input">
        <label>
          <input type="search" onChange={handleInputChange} value={word} className="search-input" required/>
          <span className="placeholder"> Word to search</span>
        </label>
      </div>
      <button className="search-button" onClick={(event) => {
        event.preventDefault()
        handleSearch(word)}}
      >Search</button>
    </form>
  );
}

export default SearchBar;