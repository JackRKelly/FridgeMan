import React from "react";
import "./styles.scss";

const NavigationCurve = ({ setShowPass, showPass }) => {
  return (
    <div
      className="navigation-curve"
      onClick={() => {
        setShowPass(!showPass);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        viewBox="0 0 1920 168"
      >
        <path className="st0" d="M0,0v31c768,100,1152,100,1920,0V0H0z" />
      </svg>
    </div>
  );
};

export default NavigationCurve;
