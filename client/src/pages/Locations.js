import React from "react";
import ListLocations from "../components/Location/ListLocations";

const Locations = ({ locationList, setLocationList, getLocations }) => {
  return (
    <>
      <ListLocations locationList={locationList} getLocations={getLocations} />
    </>
  );
};

export default Locations;
