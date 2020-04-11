import React from "react";
import "./styles.scss";

const Hamburger = ({ navOpen }) => {
  return (
    <div className="hamburger" style={{ opacity: navOpen ? "0" : "1" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30%"
        viewBox="0 0 284.35 196.54"
      >
        <rect class="cls-1" width="284.35" height="36" />
        <rect class="cls-1" x="38.89" y="80.73" width="206.56" height="36.03" />
        <rect class="cls-1" x="89.1" y="160.51" width="106.16" height="36.03" />
      </svg>
    </div>
  );
};

export default Hamburger;
