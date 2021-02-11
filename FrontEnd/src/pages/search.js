import React, { useState } from "react"
import Layout from "../components/Layout/layout"
import SearchBar from "../components/SearchBar"
import Results from "../components/Results"
import { getFrom } from "../api/backend"

const Index = () => {
  const [elements, setElements] = useState([]);

  const handleSearch = async (word) => {
    if(word === '') return;
    const data = await getFrom('search', word);
    setElements(data[0].occurrences)
  };

  return(
    <Layout>
      <SearchBar handleSearch = { handleSearch }/>
      <Results data = {elements}/>
    </Layout>
  );
}

export default Index;
