import React, { Fragment } from 'react';
import ListStocks from './components/ListStock';
import Header from './components/Header';
import './App.css';

const App = () => {
  return (
    <Fragment>
        <Header/>
        <ListStocks/>
    </Fragment>
  );
}

export default App;
