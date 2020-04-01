import React from "react";
//import EditLocation from "../EditLocation";
import "./styles.scss";

const ListLocations = ({ locationList, getLocations }) => {
  // const deleteLocations = async id => {
  //   try {
  //     await fetch(`http://localhost:5000/locations/${id}`, {
  //       method: "DELETE"
  //     });
  //     getLocations();
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  return (
    <div className="location-list">
      {locationList.map((location, index) => {
        console.log(locationList);
        return (
          <div className="location-list-item" key={location.location_id}>
            <p className="name">{location.name}</p>
            {/* <EditLocation /> */}
            <button
            // onClick={() => {
            //   deleteStock(stock.stock_id);
            // }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ListLocations;
