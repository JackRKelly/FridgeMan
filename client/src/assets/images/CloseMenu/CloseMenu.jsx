import React from "react";
import "./styles.scss";

const CloseMenu = ({ closeNavigation }) => {
  return (
    <div className="close-menu" onClick={closeNavigation}>
      <svg
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 243.2 243.2"
      >
        <polygon
          className="cls-1"
          points="243.2 29.7 213.5 0 121.6 91.9 29.7 0 0 29.7 91.9 121.6 0 213.5 29.7 243.2 121.6 151.3 213.5 243.2 243.2 213.5 151.3 121.6 243.2 29.7"
        />
      </svg>
    </div>
  );
};

export default CloseMenu;
