import React from "react";
import { Container, Table } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Store";
import ConfirmationSteps from "./ConfirmationSteps";

function ConfirmOrder() {
  const { state4, state5 } = useStore();
  const navigate = useNavigate();

  if (!state4.shippingInfo && !state5.paymentInfo) {
    navigate("/cart");
  }

  console.log(state4.shippingInfo);
  return (
    <>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <ConfirmationSteps
        checkout={false}
        payment={false}
        confirm={true}
      ></ConfirmationSteps>
      <Container>
        <div className="my-5">
          <h3>Shipping Details</h3>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>City</th>
                <th>Post Code</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{state4.shippingInfo.fullname}</td>
                <td>{state4.shippingInfo.address}</td>
                <td>{state4.shippingInfo.city}</td>
                <td>{state4.shippingInfo.postCode}</td>
                <td>{state4.shippingInfo.country}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}

export default ConfirmOrder;
