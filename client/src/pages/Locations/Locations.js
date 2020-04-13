import React, { useState } from "react";
import ListLocations from "../../components/Location/ListLocations";
import AddLocation from "../../components/Location/AddLocation";
import "./locations.scss";

const Locations = ({ locationList, getLocations, username }) => {
  document.title = "FridgeMan - Locations";

  const [addVisible, setAddVisibility] = useState(false);

  return (
    <div className="locations page">
      <div className="location-content">
        <h3>{username}'s</h3>
        <h1>Location List</h1>
        <div className="button-container">
          <button
            className="add-location-button"
            onClick={() => {
              setAddVisibility(true);
            }}
          >
            Add Location
          </button>
        </div>
        <AddLocation
          setAddVisibility={setAddVisibility}
          addVisible={addVisible}
          locationList={locationList}
          getLocations={getLocations}
        />
        <ListLocations
          locationList={locationList}
          getLocations={getLocations}
        />
      </div>
    </div>
  );
};

export default Locations;
