import React from "react";
import "./styles.scss";

const CheckMark = ({ value }) => {
  return (
    <div
      className="check-mark"
      style={{
        opacity: value ? "1" : "0",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 116.65 83.95"
        style={{
          transform: value ? "translateY(-50%)" : "translateY(-100%)",
        }}
      >
        <polygon
          className="cls-1"
          points="116.65 8.41 108.24 0 41.1 67.14 8.41 34.44 0 42.85 41.1 83.95 49.51 75.54 49.51 75.54 116.65 8.41"
        />
      </svg>
    </div>
  );
};

export default CheckMark;
