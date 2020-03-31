import React, { useState } from "react";
import AddStock from '../AddStock';
import SearchStock from '../SearchStock';
import "./styles.scss";


const Navigation = ({ setStocks, locationList, getStocks, name, setName, location, setLocation }) => {

  const [addVisible, setAddVisibility] = useState(false);

  const Form = ({ addVisible }) => {
    if (addVisible) {
      return <AddStock locationList={locationList} getStocks={getStocks}/>
    }
    return <SearchStock name={name} location={location} setName={setName} setLocation={setLocation} locationList={locationList} setStocks={setStocks}/>
  }

  return (
    <>
      <nav>
        <ul>
          <li onClick={() => {setAddVisibility(true)}}>Add</li>
          <li onClick={() => {setAddVisibility(false)}}>Search</li>
        </ul>
      </nav>
      <Form addVisible={addVisible}/>
    </>
  );
};

export default Navigation;
