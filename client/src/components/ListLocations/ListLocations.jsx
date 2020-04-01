import React from "react";
//import EditLocation from "../EditLocation";
import "./styles.scss";

const ListStocks = ({
  locationList,
  getLocations
}) => {
  const deleteStock = async id => {
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
        // let today = new Date();
        // let expDate = new Date(stock.expiration);
        // let difDay = Math.round((expDate - today) / (1000 * 3600 * 24));
        // let color;
        // if (difDay < 30) {
        //   color = "red";
        // } else if (difDay < 90) {
        //   color = "#F9A107";
        // } else {
        //   color = "green";
        // }
        return (
          <div className="stock-list-item">
            {/* <div className="row-1">
              <p className="name">{stock.name}</p>
              <p className="quantity">Qt. {stock.quantity}</p>
            </div>
            <div className="row-2">
              <p className="location">{stock.location}</p>
              <p className="expiration">
                Exp. <span style={{ color: color }}>{difDay}</span> days
              </p>
            </div>
            <div className="row-3">
              <EditLocation

              />
              <button
                onClick={() => {
                  deleteStock(stock.stock_id);
                }}
              >
                Delete
              </button>
            </div> */}
          </div>
        );
      })}
    </div>
  );
};

export default ListStocks;
