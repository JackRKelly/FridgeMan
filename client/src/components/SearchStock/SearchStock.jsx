import React, { useState } from "react";
import "./styles.scss";

const SearchStock = ({ setStocks, locationList, name, setName, location, setLocation }) => {

  const searchStock = async e => {
    e.preventDefault();
    try {
      const searchResult = await fetch(
        `http://localhost:5000/stocks/search/?name=${name}&location=${location}`
      );
      const jsonResponse = await searchResult.json();
      await setStocks(jsonResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <form
        className="search"
        onSubmit={e => {
          searchStock(e);
        }}
      >
        <div className="search-input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Search Name"
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="search-input">
          <label htmlFor="location">Location</label>
          <select
            name="location"
            value={location}
            onChange={e => {
              setLocation(e.target.value);
            }}
          >
            <option value="all-locations">All Locations</option>
            {locationList.map((location, key) => {
              return (
                <option
                  key={key}
                  value={location.charAt(0).toUpperCase() + location.slice(1)}
                >
                  {location}
                </option>
              );
            })}
          </select>
        </div>
        <div className="btn-container">
          <button>Search Stock</button>
        </div>
      </form>
    </>
  );
};

export default SearchStock;
