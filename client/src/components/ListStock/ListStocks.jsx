import React, {useEffect} from "react";
import EditStock from "../EditStock";
import "./styles.scss";

const ListStocks = ({
  stocks,
  getStocks,
  setStocks,
  locationList,
  isMobile
}) => {
  const deleteStock = async id => {
    try {
      await fetch(`http://localhost:5000/stocks/${id}`, {
        method: "DELETE"
      });
      console.log("get stocks delete stock list stocks");
      getStocks();
    } catch (err) {
      console.error(err.message);
    }
  };

  const MobileList = () => {
    return (
      <div className="stock-list">
        {stocks.map((stock, index) => {
          let today = new Date();
          let expDate = new Date(stock.expiration);
          let difDay = Math.round((expDate - today) / (1000 * 3600 * 24));
          let color;
          if (difDay < 30) {
            color = "red";
          } else if (difDay < 90) {
            color = "#F9A107";
          } else {
            color = "green";
          }
          return (
            <div className="stock-list-item" key={stock.stock_id}>
              <div className="row-1">
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

  const DesktopList = () => {
    return (
      <table className="stock-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Location</th>
            <th>Expiration</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => {
            let today = new Date();
            let expDate = new Date(stock.expiration);
            let difDay = Math.round((expDate - today) / (1000 * 3600 * 24));
            let color;
            if (difDay < 30) {
              color = "red";
            } else if (difDay < 90) {
              color = "#F9A107";
            } else {
              color = "green";
            }
            return (
              <tr key={stock.stock_id}>
                <td>{stock.name}</td>
                <td>{stock.quantity}</td>
                <td>{stock.location}</td>
                <td><span style={{ color: color }}>{difDay}</span> days</td>
                <td>
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return isMobile ? <MobileList /> : <DesktopList />;
};

export default ListStocks;
