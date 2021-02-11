import React, { useState } from "react"
import Layout from "../components/Layout/layout"
import IndexBar from "../components/IndexBar"
import '../api/backend'
import { clearIndex, postTo } from "../api/backend"

const Index = () => {
  const [message, setMessage] = useState('')

  const getContent = () => {
    if(message !== '')
      return (<p className="indexed-ocurrences">{message}</p>);
  }

  const handleIndex = async (page) => {
    if(page === '') return;
    const data = await postTo('index' , page);
    if (data.pages === 0){
      setMessage('There where no new pages indexed. Check if the url provided is correct or has been indexed previously')
      return
    }
    setMessage('Successfully indexed ' + data.pages + ' and ' + data.words + ' words.');
  }

  const handleClear = async () =>{
    const response =await clearIndex('clear');
    setMessage(response);
  }

  return(
    <Layout>
      <IndexBar handleIndex={ handleIndex} handleClear={ handleClear}/>
      {getContent()}
    </Layout>
  );
}

export default Index;
