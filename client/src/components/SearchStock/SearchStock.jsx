import React, { useState } from "react";
import "./styles.scss";

const SearchStock = ({ setStocks, locationList }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("all-locations");

  const searchStock = async e => {
    e.preventDefault();
    try {
      const searchResult = await fetch(
        `http://localhost:5000/stocks/search/?name=${name}&location=${location}`
      );
      const jsonResponse = await searchResult.json();
      await setStocks(jsonResponse);
      await console.log(jsonResponse);
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
        <input
          type="text"
          placeholder="Search Name"
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
        />
        <select
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
        <button>Search Stock</button>
      </form>
    </>
  );
};

export default SearchStock;
