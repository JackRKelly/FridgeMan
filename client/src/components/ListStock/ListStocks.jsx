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
    <div className="stocks">
      {stocks.map(stock => {
        let today = new Date();
        let expDate = new Date(stock.expiration);
        let difDay = Math.round((expDate - today) / (1000 * 3600 * 24));
        let expStr =
          difDay <= 0
            ? `Expired ${difDay * -1} days ago.`
            : `Expires in ${difDay} days.`;

        return (
          <div key={stock.stock_id}>
            <p>
              {stock.quantity}x {stock.name}, Located in the {stock.location},{" "}
              {expStr}
            </p>
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
        );
      })}
    </div>
  );
};

export default ListStocks;
