import React from "react";
import { Link } from "react-router-dom";
import "../css/Backbutton.css";
function BackButton({ goto }) {
  return (
    <Link to={goto}>
      <div className="backbutton">
        <div className="d-inline-flex flex-column align-items-center justify-content-center">
          <img
            src="https://img.icons8.com/flat-round/64/000000/long-arrow-left.png"
            alt="backbutton"
            width="50px"
          />
          <h5 className="opacity-50">Back</h5>
        </div>
      </div>
    </Link>
  );
}

export default BackButton;
