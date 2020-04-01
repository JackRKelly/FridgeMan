import React, { useState, useEffect } from "react";
import ListStocks from "../components/ListStock";
import Navigation from "../components/Navigation";

const ViewStocks = ({ isMobile }) => {
  const [stocks, setStocks] = useState([]);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("all-locations");

  const [locationList] = useState([
    "Fridge",
    "Freezer",
    "Basement Freezer",
    "Pantry",
    "Hutch",
    "Laundry Room",
    "Basement Freezer 2"
  ]);

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

export default ViewStocks;
