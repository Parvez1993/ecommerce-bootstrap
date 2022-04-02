import React from "react";
import { Helmet } from "react-helmet-async";
import ConfirmationSteps from "../components/ConfirmationSteps";

function Payment() {
  return (
    <div>
      <Helmet>
        <title>Shipping</title>
      </Helmet>
      <ConfirmationSteps
        checkout={false}
        payment={true}
        confirm={false}
      ></ConfirmationSteps>
      Payment
    </div>
  );
}

export default Payment;
