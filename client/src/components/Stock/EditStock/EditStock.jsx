import React, { useState } from "react";

const EditStock = ({ stock, locationList, stocks, setStocks }) => {
  const [name, setName] = useState(stock.name);
  const [location, setLocation] = useState(stock.location);
  const [quantity, setQuantity] = useState(stock.quantity);
  const [expiration, setExpiration] = useState(stock.expiration);
  const [visible, setVisible] = useState(false);

  const updateStock = async (e) => {
    e.preventDefault();
    const body = { name, location, quantity, expiration };
    await fetch(`/api/stocks/${stock.stock_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    let newStocks = [...stocks];

    newStocks.map((currentStock) => {
      if (currentStock.stock_id === stock.stock_id) {
        currentStock.name = name;
        currentStock.location = location;
        currentStock.quantity = quantity;
        currentStock.expiration = expiration;
      }
      return "done";
    });

    setStocks(newStocks);
    setVisible(false);
    setName(name);
    setLocation(location);
    setQuantity(quantity);
    setExpiration(expiration);
  };

  const closeModal = () => {
    setName(stock.name);
    setLocation(stock.location);
    setQuantity(stock.quantity);
    setExpiration(stock.expiration);
    setVisible(false);
  };

  return (
    <>
      <button
        type="button"
        className="open-modal"
        onClick={() => setVisible(true)}
      >
        Edit
      </button>

      <div
        className="edit-stock-modal"
        id={`modal${stock.stock_id}`}
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <form className="edit-stock">
          <h1 className="modal-title">Edit Stock: "{stock.name}"</h1>
          <div className="input-container">
            <div className="input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="location">Location</label>
              <select
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              >
                {locationList.map((location, key) => {
                  return (
                    <option key={key} value={location.name}>
                      {location.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="input">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                min="0"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </div>
            <div className="input">
              <label htmlFor="expiration">Expiration</label>
              <input
                type="date"
                className="form-control"
                name="expiration"
                value={expiration}
                onChange={(e) => setExpiration(e.target.value)}
              />
            </div>
          </div>
          <div className="btn-container">
            <button type="submit" className="btn" onClick={updateStock}>
              Edit
            </button>
            <button type="button" className="btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </form>
        <div className="modal-background" onClick={closeModal}></div>
      </div>
    </>
  );
};

export default EditStock;
