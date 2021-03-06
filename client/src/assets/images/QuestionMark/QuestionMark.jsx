import React from "react";
import "./styles.scss";

const QuestionMark = () => {
  return (
    <div className="question-mark">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        viewBox="0 0 117.6 208.5"
      >
        <path
          className="cls-1"
          d="M53.7,176.4h-.4a16,16,0,0,0,0,32.08h.4a16.05,16.05,0,0,0,0-32.1ZM58.5,0C31.2,0,9.9,12.6,0,36.3l8.55,4.42L17.4,45.3c9-18,21-26.4,41.1-26.4C80.7,18.9,96,33.6,96,57.3c0,22.2-15.3,40.2-42,40.2H44.1v52.8H63.9V114c31.8-2.4,53.7-24.9,53.7-56.7C117.6,23.1,93.9,0,58.5,0Z"
        />
        <path className="cls-2" d="M53.3,176.41v32.08a16,16,0,0,1,0-32.08Z" />
        <path
          className="cls-2"
          d="M104.3,76.6c-8.41,19.7-27.26,26.32-33,28a52.69,52.69,0,0,1-18,2v43.7H44.1V97.5H54c26.7,0,42-18,42-40.2,0-23.7-15.3-38.4-37.5-38.4-20.1,0-32.1,8.4-41.1,26.4L8.55,40.72A39,39,0,0,1,20.62,22.05,38.65,38.65,0,0,1,25.3,18.6c11.9-8.94,24.78-9.78,29-10a51,51,0,0,1,30,7,50.3,50.3,0,0,1,21,26C106.63,45.45,111.25,60.31,104.3,76.6Z"
        />
      </svg>
    </div>
  );
};

export default QuestionMark;
