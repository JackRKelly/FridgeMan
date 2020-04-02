import React, { useState } from "react";
import ListLocations from "../components/Location/ListLocations";
import AddLocation from "../components/Location/AddLocation";

const Locations = ({ locationList, setLocationList, getLocations }) => {
  const [addVisible, setAddVisibility] = useState(false);

  return (
    <>
      <button
        className="add-location-btn"
        onClick={() => {
          setAddVisibility(true);
        }}
      >
        Add Location
      </button>
      <AddLocation
        setAddVisibility={setAddVisibility}
        addVisible={addVisible}
        locationList={locationList}
        getLocations={getLocations}
      />
      <ListLocations locationList={locationList} getLocations={getLocations} />
    </>
  );
};

export default Locations;
