import React from "react";
import "./styles.scss";

const XMark = ({ value }) => {
  return (
    <div
      className="x-mark"
      style={{
        opacity: !value ? "1" : "0",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 75.9 75.9"
        style={{
          transform: !value ? "translateY(-50%)" : "translateY(-20%)",
        }}
      >
        <polygon
          className="cls-1"
          points="75.9 8 67.9 0 37.95 29.95 8 0 0 8 29.95 37.95 0 67.9 8 75.9 37.95 45.95 67.9 75.9 75.9 67.9 45.95 37.95 75.9 8"
        />
      </svg>
    </div>
  );
};

export default XMark;
