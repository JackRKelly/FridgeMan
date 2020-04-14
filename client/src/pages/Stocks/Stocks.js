import React, { useState, useEffect } from "react";
import ListStocks from "../../components/Stock/ListStock";
import AddStock from "../../components/Stock/AddStock";
import SearchStock from "../../components/Stock/SearchStock";
import "./stocks.scss";

const Stocks = ({ isMobile, locationList, username }) => {
  document.title = "FridgeMan - Stocks";

  const [addVisible, setAddVisibility] = useState(false);
  const [searchVisible, setSearchVisibility] = useState(false);

  const [stocks, setStocks] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("all-locations");

  const getStocks = async () => {
    await fetch("/api/stocks")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStocks(data);
      });
  };

  useEffect(() => {
    getStocks();
  }, []);

  return (
    <div className="stocks page">
      <div className="stock-content">
        <h3>{username}'s</h3>
        <h1>Stock List</h1>
        <div className="navigation-buttons">
          <button
            onClick={() => {
              setAddVisibility(true);
            }}
          >
            Add Item
          </button>
          <button
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
        <ListStocks
          locationList={locationList}
          getStocks={getStocks}
          stocks={stocks}
          setStocks={setStocks}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export default Stocks;
