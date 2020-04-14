import React from "react";
import EditStock from "../EditStock";

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
    return Math.round((expDate - today) / (1000 * 3600 * 24) + 1);
  };

  const MobileList = () => {
    return (
      <div className="stock-list">
        {stocks
          .sort((a, b) =>
            getDifDays(a.expiration) > getDifDays(b.expiration) ? 1 : -1
          )
          .map((stock) => {
            let difDay = getDifDays(stock.expiration);
            let color = {
              text: "",
              background: "",
            };
            if (difDay < 30) {
              color.text = "rgba(255,0,0,1)";
              color.background = "rgba(255,0,0,.1)";
            } else if (difDay < 90) {
              color.text = "rgba(255,165,0,1)";
              color.background = "rgba(255,165,0,.1)";
            } else {
              color.text = "rgba(46, 204, 113, 1)";
              color.background = "rgba(46, 204, 113, .1)";
            }
            return (
              <div className="stock-list-item" key={stock.stock_id}>
                <div className="row-1">
                  <p className="name">{stock.name}</p>
                  <p className="quantity">{stock.quantity}x</p>
                </div>
                <div className="row-2">
                  <p className="location">{stock.location}</p>
                  <p className="expiration">
                    <span
                      style={{
                        color: color.text,
                        backgroundColor: color.background,
                      }}
                    >
                      {difDay} days
                    </span>
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
            .map((stock) => {
              let difDay = getDifDays(stock.expiration);
              let color = {
                text: "",
                background: "",
              };
              if (difDay < 30) {
                color.text = "rgba(255,0,0,1)";
                color.background = "rgba(255,0,0,.1)";
              } else if (difDay < 90) {
                color.text = "rgba(255,165,0,1)";
                color.background = "rgba(255,165,0,.1)";
              } else {
                color.text = "rgba(46, 204, 113, 1)";
                color.background = "rgba(46, 204, 113, .1)";
              }
              return (
                <tr key={stock.stock_id}>
                  <td>{stock.name}</td>
                  <td>{stock.quantity}</td>
                  <td>{stock.location}</td>
                  <td>
                    <span
                      className="expiration-span"
                      style={{
                        color: color.text,
                        backgroundColor: color.background,
                      }}
                    >
                      {difDay} days
                    </span>
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
