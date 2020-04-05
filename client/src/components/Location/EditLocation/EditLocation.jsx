import React, { useState } from "react";
import "./styles.scss";

const EditLocation = ({ locationList, location, getLocations }) => {
  const [name, setName] = useState(location.name);
  const [visible, setVisible] = useState(false);

  const updateLocation = async e => {
    e.preventDefault();
    try {
      const body = { name };
      await fetch(`http://localhost:5000/locations/${location.location_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      getLocations();
      setVisible(false);
      setName(name);
    } catch (err) {
      console.error(err.message);
    }
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
          pointerEvents: visible ? "auto" : "none"
        }}
      >
        <form>
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Location: "{location.name}"</h4>
            </div>

            <div className="modal-body">
              <div className="modal-input">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn" onClick={updateLocation}>
                Edit
              </button>
              <button type="button" className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </form>
        <div className="modal-background" onClick={closeModal}></div>
      </div>
    </>
  );
};

export default EditLocation;