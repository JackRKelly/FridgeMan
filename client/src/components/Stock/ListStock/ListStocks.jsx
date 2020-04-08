import React from "react";
import EditStock from "../EditStock";
import "./styles.scss";

const ListStocks = ({
  stocks,
  getStocks,
  setStocks,
  locationList,
  isMobile,
}) => {
  const deleteStock = async (id) => {
    await fetch(`/api/stocks/${id}`, {
      method: "DELETE",
    });
    getStocks();
  };

  const getDifDays = (expiration) => {
    let today = new Date();
    let expDate = new Date(expiration);
    return Math.round((expDate - today) / (1000 * 3600 * 24));
  };

  const MobileList = () => {
    return (
      <div className="stock-list">
        {stocks
          .sort((a, b) =>
            getDifDays(a.expiration) > getDifDays(b.expiration) ? 1 : -1
          )
          .map((stock, index) => {
            let difDay = getDifDays(stock.expiration);
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
          {stocks
            .sort((a, b) =>
              getDifDays(a.expiration) > getDifDays(b.expiration) ? 1 : -1
            )
            .map((stock, index) => {
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
                  <td>
                    <span style={{ color: color }}>{difDay}</span> days
                  </td>
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
  return stocks.length === 0 ? (
    <h1 className="no-stock">No stocks found.</h1>
  ) : isMobile ? (
    <MobileList />
  ) : (
    <DesktopList />
  );
};

export default ListStocks;
