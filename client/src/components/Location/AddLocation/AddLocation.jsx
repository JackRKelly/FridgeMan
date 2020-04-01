import React, { useState } from "react";
import "./styles.scss";

const AddLocation = ({ getLocations, setAddVisibility, addVisible }) => {
  const [name, setName] = useState("");

  const addLocation = async e => {
    e.preventDefault();
    try {
      const body = { name };
      await fetch("http://localhost:5000/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      setName("");
      getLocations();
      setAddVisibility(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div
      className="add-location-modal"
      style={{
        opacity: addVisible ? "1" : "0",
        pointerEvents: addVisible ? "auto" : "none"
      }}
    >
      <form
        className="add"
        onSubmit={e => {
          addLocation(e);
        }}
      >
        <h1>Add a stock</h1>
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
        <div className="btn-container">
          <button type="submit">Add</button>
          <button
            type="button"
            onClick={() => {
              setAddVisibility(false);
            }}
          >
            Close
          </button>
        </div>
      </form>
      <div
        className="modal-background"
        onClick={() => {
          setAddVisibility(false);
        }}
      ></div>
    </div>
  );
};

export default AddLocation;
