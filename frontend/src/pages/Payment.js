import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import ConfirmationSteps from "../components/ConfirmationSteps";
import { Button, Container, Form } from "react-bootstrap";
import BackButton from "../components/BackButton";
import { useStore } from "../Store";
import { useNavigate } from "react-router-dom";

function Payment() {
  const { state5, dispatch5 } = useStore();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(
    state5.paymentInfo ? state5.paymentInfo : "paypal"
  );
  const handlePayment = async (e) => {
    dispatch5({ type: "PAYMENT_BEGIN" });
    try {
      await dispatch5({ type: "PAYMENT_SUCCESS", payload: payment });
      navigate("/confirm");
    } catch (error) {
      dispatch5({
        type: "PAYMENT_ERROR",
        payload: { error: error.response.data.msg },
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <ConfirmationSteps
        checkout={false}
        payment={true}
        confirm={false}
      ></ConfirmationSteps>

      <BackButton goto="/shipping" />

      <Container>
        <div className="m-5">
          <div className=" mx-auto border rounded">
            <h4 className="text-center my-3">Choose Payment Method</h4>
            <Form className="mx-auto w-25 text-uppercase ">
              <Form.Check
                type="radio"
                label="paypal"
                value="paypal"
                name="payment"
                defaultChecked={state5.paymentInfo === "paypal" ? "paypal" : ""}
                onChange={(e) => setPayment(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="strip"
                value="strip"
                name="payment"
                defaultChecked={state5.paymentInfo === "strip" ? "strip" : ""}
                onChange={(e) => setPayment(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="sslcommerz"
                value="sslcommerz"
                name="payment"
                defaultChecked={
                  state5.paymentInfo === "sslcommerz" ? "sslcommerz" : ""
                }
                onChange={(e) => setPayment(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="virtual card"
                value="virtual_card"
                name="payment"
                defaultChecked={
                  state5.paymentInfo === "virtual_card" ? "virtual_card" : ""
                }
                onChange={(e) => setPayment(e.target.value)}
              />
              <Button className="w-100 btn-block my-3" onClick={handlePayment}>
                Continue
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Payment;
