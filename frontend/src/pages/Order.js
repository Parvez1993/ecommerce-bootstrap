import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../Store";
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import axios from "axios";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast, ToastContainer } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";
function Order() {
  //reducers

  const reducer7 = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true, error: "" };
      case "FETCH_SUCCESS":
        return { ...state, loading: false, order: action.payload, error: "" };
      case "FETCH_FAIL":
        return { ...state, loading: false, error: action.payload };
      case "PAYPAL_REQUEST":
        return { ...state, loadingPay: true };
      case "PAYPAL_SUCCESS":
        return { ...state, loadingPay: false };
      case "PAYPAL_FAIL":
        return { ...state, loadingPay: false, errorPay: action.payload };
      case "PAYPAL_RESET":
        return { ...state, loadingPay: false, successPay: false };
      default:
        return state;
    }
  };
  const [
    { loading, order, error, successPay, loadingPay, errorPay },
    dispatch7,
  ] = useReducer(reducer7, {
    loading: false,
    order: {},
    error: "",
    successPay: false,
    loadingPay: false,
  });

  const { id } = useParams();

  const { state3 } = useStore();

  console.log("nooooo", state3.userInfo.token);

  // paypal step 1
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  let [fetchedOrder, setFetchedOrder] = useState("");

  const getOrder = async () => {
    try {
      dispatch7({ type: "FETCH_REQUEST" });
      const { data } = await axios.get(`/orders/${id}`, {
        headers: { Authorization: "Bearer " + state3.userInfo.token },
      });

      setFetchedOrder(data.order);
      dispatch7({ type: "FETCH_SUCCESS", payload: data.order });
    } catch (error) {
      dispatch7({ type: "FETCH_SUCCESS", payload: error });
    }
  };

  useEffect(() => {
    if (!order._id || (order._id && order._id !== id)) {
      getOrder();

      if (successPay) {
        dispatch7({ type: "PAY_RESET" });
      }
    } else {
      const loadPayPalScript = async () => {
        const { data } = await axios.get("/keys/paypal", {
          headers: {
            authorization: `Bearer ${state3.userInfo.token}`,
          },
        });

        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": data,
            currency: "USD",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      };

      loadPayPalScript();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order._id, paypalDispatch, successPay, state3.userInfo]);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
              currency_code: "USD",
            },
          },
        ],
      })
      .then((orderID) => {
        console.log(orderID);
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      console.log("detaaaiils", details);
      try {
        dispatch7({ type: "PAYPAL_REQUEST" });

        const { data } = await axios.put(`/orders/${order._id}/pay`, details, {
          headers: {
            authorization: `Bearer ${state3.userInfo.token}`,
          },
        });

        toast("Congrats buddy lets celebrate");

        dispatch7({ type: "PAYPAL_SUCCESS", payload: data });
      } catch (error) {
        dispatch7({ type: "PAYPAL_FAIL", payload: error.message });
        toast.error(error.message);
      }
    });
  };

  const onError = (err) => {
    toast.error(err.message);
  };

  console.log("order", order);
  //stripe payment

  const stripepayment = async (token) => {
    try {
      dispatch7({ type: "PAYPAL_REQUEST" });
      const { data } = await axios.put(
        `/orders/${order._id}/payment`,
        {
          order: order,
          token: token,
          amount: order.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${state3.userInfo.token}`,
          },
        }
      );
      console.log(data);
      toast("Congrats buddy lets celebrate");
      dispatch7({ type: "PAYPAL_SUCCESS", payload: data });
    } catch (error) {
      dispatch7({ type: "PAYPAL_FAIL", payload: error.message });
      toast.error(error.message);
    }
  };

  const handleToken = async (token) => {
    try {
      dispatch7({ type: "FETCH_REQUEST" });
      const { data } = await axios.get(`/orders/${id}`, {
        headers: { Authorization: "Bearer " + state3.userInfo.token },
      });

      setFetchedOrder(data.order);
      dispatch7({ type: "FETCH_SUCCESS", payload: data.order });
      stripepayment(token);
    } catch (error) {
      dispatch7({ type: "FETCH_SUCCESS", payload: error });
    }
  };

  return (
    <>
      <h6>{order.paymentMethod}</h6>
      {fetchedOrder ? (
        <div>
          <Container>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Row className="my-5">
              <Col lg={6}>
                <ListGroup>
                  <ListGroup.Item>
                    <h5>Shipping</h5>
                    <h6>Name: {fetchedOrder.shippingAddress.fullname}</h6>
                    <h6>
                      Address: {fetchedOrder.shippingAddress.address},
                      {fetchedOrder.shippingAddress.city},
                      {fetchedOrder.shippingAddress.country}{" "}
                    </h6>
                    <h6>
                      Phone Number: {fetchedOrder.shippingAddress.phoneNumber}
                    </h6>
                  </ListGroup.Item>
                </ListGroup>

                <ListGroup className="mt-3">
                  <ListGroup.Item>
                    <h5>Payment</h5>
                    <h6>Payment Method: {fetchedOrder.paymentMethod}</h6>
                  </ListGroup.Item>
                </ListGroup>

                <ListGroup className="mt-3">
                  <ListGroup.Item>
                    {fetchedOrder.orderItems.map((item, k) => {
                      return (
                        <div
                          keys={k}
                          className="d-flex align-items-center justify-content-between"
                        >
                          <img
                            src={item.img}
                            alt={item.name}
                            className="img-thumbnail rounded"
                            style={{ width: "15%" }}
                          />
                          <p>{item.quantity}</p>
                          <p>${item.price}</p>
                        </div>
                      );
                    })}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col lg={4} className="mt-lg-0 mt-md-3 mt-3">
                <ListGroup>
                  <ListGroup.Item>
                    <h5>Summary</h5>
                  </ListGroup.Item>
                  <ListGroupItem>
                    {" "}
                    <p>Item Price : ${fetchedOrder.itemsPrice}</p>
                  </ListGroupItem>
                  <ListGroupItem>
                    {" "}
                    <p>Tax Price : ${fetchedOrder.taxPrice}</p>
                  </ListGroupItem>
                  <ListGroupItem>
                    {" "}
                    <p>Shipping Price : ${fetchedOrder.shippingPrice}</p>
                  </ListGroupItem>
                  <ListGroupItem>
                    {" "}
                    <p className="fs-4">
                      Total Price: ${fetchedOrder.totalPrice}
                    </p>
                  </ListGroupItem>
                </ListGroup>
                <ListGroup>
                  {!fetchedOrder.isPaid && isPending ? (
                    <h4>Loading</h4>
                  ) : order.paymentMethod === "paypal" ? (
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
                  ) : order.paymentMethod === "strip" ? (
                    <StripeCheckout
                      stripeKey={process.env.REACT_APP_STIPE_KEY}
                      panelLabel="Send Money"
                      currency="USD"
                      amount={order.totalPrice}
                      token={handleToken}
                    ></StripeCheckout>
                  ) : (
                    ""
                  )}
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Order;
