import React from "react";
import "../css/ConfirmationSteps.css";

function ConfirmationSteps({ checkout, payment, confirm }) {
  return (
    <div className="progressbar-wrapper mx-auto">
      <ul className="progressbar">
        <li className={checkout ? "active" : ""}>Checkout</li>
        <li className={payment ? "active" : ""}>Payment</li>
        <li className={confirm ? "active" : ""}>Confirm Order</li>
      </ul>
    </div>
  );
}

export default ConfirmationSteps;
