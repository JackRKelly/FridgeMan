import React, { useState, useEffect } from "react";
import ListStocks from "../../components/Stock/ListStock";
import Navigation from "../../components/Stock/Navigation";

const Stocks = ({ isMobile, locationList }) => {
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
  );
};

export default Stocks;
