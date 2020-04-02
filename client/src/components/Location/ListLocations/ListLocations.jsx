import React from "react";
import EditLocation from "../EditLocation";
import "./styles.scss";

const ListLocations = ({ locationList, getLocations }) => {
  const deleteLocation = async id => {
    try {
      await fetch(`http://localhost:5000/locations/${id}`, {
        method: "DELETE"
      });
      getLocations();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="location-list">
      {locationList.map((location, index) => {
        return (
          <div className="location-list-item" key={location.location_id}>
            <p className="name">{location.name}</p>
            <div className="btn-container">
              <EditLocation location={location} getLocations={getLocations} />
              <button
                onClick={() => {
                  deleteLocation(location.location_id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListLocations;
