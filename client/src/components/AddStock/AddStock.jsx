import React, { useState } from "react";
import "./styles.scss";

const AddStock = ({ getStocks, locationList }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("Fridge");
  const [quantity, setQuantity] = useState("");
  const [expiration, setExpiration] = useState("");

  const addStock = async e => {
    e.preventDefault();
    try {
      const body = { name, location, quantity, expiration };
      await fetch("http://localhost:5000/stocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      setName("");
      setLocation("Fridge");
      setQuantity("");
      setExpiration("");
      getStocks();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form
      className="add"
      onSubmit={e => {
        addStock(e);
      }}
    >
      <div className="add-input">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Stock Name"
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
          required
        />
      </div>
      <div className="add-input">
        <label htmlFor="location">Location</label>
        <select
          name="location"
          value={location}
          onChange={e => {
            setLocation(e.target.value);
          }}
          required
        >
          {locationList.map((location, key) => {
            return (
              <option
                key={key}
                value={location.charAt(0).toUpperCase() + location.slice(1)}
              >
                {location}
              </option>
            );
          })}
        </select>
      </div>
      <div className="add-input">
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          name="quantity"
          placeholder="Stock Quantity"
          value={quantity}
          onChange={e => {
            setQuantity(e.target.value);
          }}
          required
        />
      </div>
      <div className="add-input">
        <label htmlFor="expiration">Expiration</label>
        <input
          name="expiration"
          type="date"
          value={expiration}
          onChange={e => {
            setExpiration(e.target.value);
          }}
          required
        />
      </div>
      <div className="btn-container">
        <button>Add Stock</button>
      </div>
    </form>
  );
};

export default AddStock;
