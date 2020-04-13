import React, { useState } from "react";

const AddLocation = ({ getLocations, setAddVisibility, addVisible }) => {
  const [name, setName] = useState("");

  const addLocation = async (e) => {
    e.preventDefault();
    const body = { name };
    await fetch("/api/locations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setName("");
    getLocations();
    setAddVisibility(false);
  };

  return (
    <div
      className="add-location-modal"
      style={{
        opacity: addVisible ? "1" : "0",
        pointerEvents: addVisible ? "auto" : "none",
      }}
    >
      <form
        onSubmit={(e) => {
          addLocation(e);
        }}
      >
        <h1 className="modal-title">Add a location</h1>
        <div className="input-container">
          <div className="input">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Location Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
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
