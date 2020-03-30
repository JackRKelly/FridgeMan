import React, { useState, useEffect } from 'react';
import ListStocks from './components/ListStock';
import AddStock from './components/AddStock';
import SearchStock from './components/SearchStock';
import './App.css';

const App = () => {
  
  const [stocks, setStocks] = useState([])

  const [locationList] = useState(['Fridge', 'Freezer', 'Basement Freezer', 'Pantry', 'Hutch', 'Laundry Room', 'Basement Freezer 2'])

  const getStocks = async () => {
    try {
        const response = await fetch('http://localhost:5000/stocks');
        const jsonResponse = await response.json();
        setStocks(jsonResponse);
    } catch (err) {
        console.error(err.message);
    }
  }

  useEffect(() => {
    console.log('get stocks app.js');
    getStocks();
  }, []);

  return (
    <>
        <AddStock locationList={locationList} getStocks={getStocks}/>
        <SearchStock locationList={locationList} stocks={stocks} setStocks={setStocks}/>
        <ListStocks locationList={locationList} getStocks={getStocks} stocks={stocks} setStocks={setStocks}/>
    </>
  );
}

export default App;
