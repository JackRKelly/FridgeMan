import React, { useState, useEffect } from "react";
import ListStocks from "../components/Stock/ListStock";
import Navigation from "../components/Stock/Navigation";

const Stocks = ({ isMobile, locationList }) => {
  const [stocks, setStocks] = useState([]);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("all-locations");

  const getStocks = async () => {
    try {
      const response = await fetch("http://localhost:5000/stocks");
      const jsonResponse = await response.json();
      setStocks(jsonResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getStocks();
  }, []);

  return (
    <>
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
    </>
  );
};

export default Stocks;
