import React from "react";
import EditLocation from "../EditLocation";

const ListLocations = ({ locationList, getLocations }) => {
  const deleteLocation = async (id) => {
    await fetch(`/api/locations/${id}`, {
      method: "DELETE",
    });
    getLocations();
  };

  return locationList.length === 0 ? (
    <h1 className="no-location">No locations found.</h1>
  ) : (
    <div className="location-list">
      {locationList
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((location, index) => {
          return (
            <div className="location-list-item" key={location.location_id}>
              <p className="name">{location.name}</p>
              <div className="options">
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
