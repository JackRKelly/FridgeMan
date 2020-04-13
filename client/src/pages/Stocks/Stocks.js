import React, { useState, useEffect } from "react";
import ListStocks from "../../components/Stock/ListStock";
import Navigation from "../../components/Stock/Navigation";
import "./stocks.scss";

const Stocks = ({ isMobile, locationList, username }) => {
  document.title = "FridgeMan - Stocks";

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
        <Navigation
          name={name}
          location={location}
          setName={setName}
          setLocation={setLocation}
          locationList={locationList}
          getStocks={getStocks}
          stocks={stocks}
          setStocks={setStocks}
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
