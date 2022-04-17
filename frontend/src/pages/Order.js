import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../Store";
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import axios from "axios";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
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

  // console.log(state3.userInfo.data.user._id);

  // paypal step 1
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  let [fetchedOrder, setFetchedOrder] = useState("");

  console.log(order);

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
      console.log("ami ekhane");
      getOrder();

      if (successPay) {
        dispatch7({ type: "PAY_RESET" });
      }
    } else {
      console.log("ami okhane");
      const loadPayPalScript = async () => {
        const { data } = await axios.get("/keys/paypal", {
          headers: {
            authorization: `Bearer ${state3.userInfo.data.user._id}`,
          },
        });

        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": "test",
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
  }, [id, paypalDispatch, successPay, state3.userInfo]);

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
      .then((id) => {
        console.log(id);
        return id;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        dispatch7({ type: "PAYPAL_REQUEST" });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            authorization: `Bearer ${state3.userInfo.data.user._id}`,
          }
        );

        toast.success("order is paid");
        dispatch7({ type: "PAYPAL_SUCCESS" });
      } catch (error) {
        dispatch7({ type: "PAYPAL_FAIL", payload: error.message });
        toast.error(error.message);
      }
    });
  };

  const onError = (err) => {
    toast.error(err.message);
  };

  return (
    <>
      {fetchedOrder ? (
        <div>
          <Container>
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
                  ) : (
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
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
