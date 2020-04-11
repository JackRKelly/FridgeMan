import React from "react";
import "./styles.scss";

const Hamburger = ({ navOpen }) => {
  return (
    <div className="hamburger" style={{ opacity: navOpen ? "0" : "1" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="44"
        viewBox="0 0 284.35 144.46"
      >
        <rect className="cls-1" width="284.35" height="26.46" />
        <rect
          className="cls-1"
          x="34.1"
          y="59.34"
          width="216.15"
          height="26.48"
        />
        <rect
          className="cls-1"
          x="71.58"
          y="117.98"
          width="141.19"
          height="26.48"
        />
      </svg>
    </div>
  );
};

export default Hamburger;
