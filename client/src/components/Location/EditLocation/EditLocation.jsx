import React, { useState } from "react";

const EditLocation = ({ locationList, location, getLocations }) => {
  const [name, setName] = useState(location.name);
  const [visible, setVisible] = useState(false);

  const updateLocation = async (e) => {
    e.preventDefault();
    const body = { name };
    await fetch(`/api/locations/${location.location_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    getLocations();
    setVisible(false);
    setName(name);
  };

  const closeModal = () => {
    setName(location.name);
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
        className="edit-location-modal"
        id={`modal${location.location_id}`}
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <form>
          <h1 className="modal-title">Edit Location: "{location.name}"</h1>

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
          </div>

          <div className="btn-container">
            <button type="submit" className="btn" onClick={updateLocation}>
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

export default EditLocation;
