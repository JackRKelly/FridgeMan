import React, { useState } from 'react';
import ListStocks from './components/ListStock';
import AddStock from './components/AddStock';
import SearchStock from './components/SearchStock';
import './App.css';

const App = () => {
  
  const [stocks, setStocks] = useState([])

  return (
    <>
        <AddStock/>
        <SearchStock stocks={stocks} setStocks={setStocks}/>
        <ListStocks stocks={stocks} setStocks={setStocks}/>
    </>
  );
}

export default App;
