import React from "react";
import EditStock from "../EditStock";
import "./styles.scss";

const ListStocks = ({ stocks, getStocks, setStocks, locationList }) => {
  const deleteStock = async id => {
    try {
      await fetch(`http://localhost:5000/stocks/${id}`, {
        method: "DELETE"
      });
      console.log("get stocks delete stock lsit stocks");
      getStocks();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="stock-list">
      {stocks.map(stock => {
        let today = new Date();
        let expDate = new Date(stock.expiration);
        let difDay = Math.round((expDate - today) / (1000 * 3600 * 24));
        let expStr = difDay <= 0 ? `Exp. ${difDay}` : `Exp. ${difDay} days`;
        return (
          <div className="stock-list-item" key={stock.stock_id}>
            <div className="row-1">
              <p className="name">{stock.name}</p>
              <p className="quantity">Qt. {stock.quantity}</p>
            </div>
            <div className="row-2">
              <p className="location">{stock.location}</p>
              <p className="expiration">{expStr}</p>
            </div>
            <div className="row-3">
              <EditStock
                locationList={locationList}
                stock={stock}
                getStocks={getStocks}
                stocks={stocks}
                setStocks={setStocks}
              />
              <button
                onClick={() => {
                  deleteStock(stock.stock_id);
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

export default ListStocks;
