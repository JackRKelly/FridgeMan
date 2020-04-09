import React, { useState } from "react";
import AddStock from "../AddStock";
import SearchStock from "../SearchStock";

const Navigation = ({
  setStocks,
  locationList,
  getStocks,
  name,
  setName,
  location,
  setLocation,
}) => {
  const [addVisible, setAddVisibility] = useState(false);
  const [searchVisible, setSearchVisibility] = useState(false);

  return (
    <>
      <div className="button-container">
        <button
          className="modal-button"
          onClick={() => {
            setAddVisibility(true);
          }}
        >
          Add Item
        </button>
        <button
          className="modal-button"
          onClick={() => {
            setSearchVisibility(true);
          }}
        >
          Search Item
        </button>
      </div>
      <AddStock
        locationList={locationList}
        getStocks={getStocks}
        setAddVisibility={setAddVisibility}
        addVisible={addVisible}
      />
      <SearchStock
        name={name}
        location={location}
        setName={setName}
        setLocation={setLocation}
        locationList={locationList}
        setStocks={setStocks}
        setSearchVisibility={setSearchVisibility}
        searchVisible={searchVisible}
      />
    </>
  );
};

export default Navigation;
