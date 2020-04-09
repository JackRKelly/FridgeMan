import React, { useState } from "react";
import ListLocations from "../../components/Location/ListLocations";
import AddLocation from "../../components/Location/AddLocation";

const Locations = ({ locationList, setLocationList, getLocations }) => {
  document.title = "FridgeMan - Locations";

  const [addVisible, setAddVisibility] = useState(false);

  return (
    <div className="locations page">
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
    </div>
  );
};

export default Locations;
