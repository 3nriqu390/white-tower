import React from "react";
import './results.scss'

const Results = ( {data} ) => {

  console.log(data);
  const getContent = () => {
    if(data.length > 0)
      return (
        <>
        <p className="results-header"> Found {data.length} results </p>
        {formattedResults}
        </>
      );
  }

  const formattedResults = data.map((elem) => {
    return (
      <div className="card-element">
        <a href={elem.page.url} target="_blank" className="external-site-result">{elem.page.name}</a>
        <p className="result-occurrences">Occurrences: <strong>{elem.ocurrences}</strong></p>
      </div>
    )
  })

  return(
    <div className="results-container">
      {getContent()}
    </div>
  );
}

export default Results;