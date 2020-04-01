import React, { useEffect } from "react";
import ListLocations from "../components/ListLocations"

const Locations = ({ locationList, setLocationList }) => {

  const getLocations = async () => {
    try {
      const response = await fetch("http://localhost:5000/locations");
      const jsonResponse = await response.json();
      setLocationList(jsonResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <>
      <ListLocations
        locationList={locationList}
        getLocations={getLocations}
      />
    </>
  );
};

export default Locations;
