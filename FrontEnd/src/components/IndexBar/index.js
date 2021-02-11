import React, { useState } from "react"
import './indexBar.scss'
import '../global.scss'

const IndexBar = ({handleIndex, handleClear}) => {
  const [url,setUrl] = useState('');

  const handleInputChange = (e)=> {
    setUrl(e.target.value)
  }

  return(
    <div className="index-container">
      <div className="form-input">
        <label>
          <input type="search" pattern=".+" name="search-input" value={url} onChange={handleInputChange} required />
          <span className="placeholder">Site to index</span>
        </label>
      </div>
      <div className="buttons-container">
        <button className="index" onClick={(e) => {
          e.preventDefault()
          handleIndex(url)}}
        >Index</button>
        <button className="clear" onClick={(e) => {
          e.preventDefault()
          handleClear()}}>Clear</button>
      </div>
    </div>
  );
}

export default IndexBar;