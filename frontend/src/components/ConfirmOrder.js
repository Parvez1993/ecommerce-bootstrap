import axios from "axios";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "../Store";
import ConfirmationSteps from "./ConfirmationSteps";

function ConfirmOrder() {
  const {
    state4,
    dispatch4,
    state5,
    dispatch5,
    state,
    dispatch,
    discount,
    state3,
    dispatch6,
  } = useStore();

  const navigate = useNavigate();

  let totalPrice = state.cart.cartItems.reduce(
    (acc, cur) => acc + cur.quantity * cur.price,
    0
  );

  let shipping = 0;

  let tax = discount
    ? discount
    : totalPrice <= 500
    ? 0
    : (totalPrice * 5) / 100;

  //Modal for shipping/////////////////////////
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Modal for payment/////////////////////////

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  //shipping details//////////////////////////

  const [fullname, setFullname] = useState(state4.shippingInfo?.fullname);
  const [address, setAddress] = useState(state4.shippingInfo?.address);
  const [city, setCity] = useState(state4.shippingInfo?.city);
  const [postCode, setPostCode] = useState(state4.shippingInfo?.postCode);
  const [country, setCountry] = useState(state4.shippingInfo?.country);
  const [phoneNumber, setPhoneNumber] = useState(
    state4.shippingInfo?.phoneNumber
  );

  //payment details

  const [payment, setPayment] = useState(
    state5.paymentInfo ? state5.paymentInfo : "paypal"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !fullname &&
      !address &&
      !city &&
      !postCode &&
      !country &&
      !phoneNumber
    ) {
      return toast.warning("Fill the Enter Form");
    }

    dispatch4({ type: "SHIPPING_BEGIN" });

    try {
      dispatch4({
        type: "SHIPPING_SUCCESS",
        payload: { fullname, address, city, postCode, country, phoneNumber },
      });
      localStorage.setItem(
        "shippingInfo",
        JSON.stringify({
          fullname,
          address,
          city,
          postCode,
          country,
          phoneNumber,
        })
      );

      handleClose();
    } catch (error) {
      dispatch4({
        type: "SHIPPING_FAIL",
        payload: { error: error.response.data.msg },
      });
    }
  };

  const handleSubmit2 = async (e) => {
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

  console.log("wtf", state3.userInfo);

  ///////////////////////////////////////////////////////////cart sumary/////////////////////////////////////
  const updateQuantity = (item, quantity) => {
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const deleteItem = (id) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    });
  };

  console.log(state3.userInfo);

  /////////////////////////////////////////place order//////////////////////////////////////////

  const placeOrder = async () => {
    try {
      dispatch6({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(
        "/orders",
        {
          orderItems: state.cart.cartItems,
          shippingAddress: state4.shippingInfo,
          paymentMethod: state5.paymentInfo,
          itemsPrice: totalPrice,
          shippingPrice: shipping,
          taxPrice: tax,
          totalPrice: totalPrice + tax + shipping,
        },
        { headers: { Authorization: "Bearer " + state3.userInfo.token } }
      );

      console.log(data);

      // dispatch({ type: "CLEAR_CART" });
      dispatch6({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch6({ type: "CREATE_FAIL" });
      toast.error(err);
    }
  };
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
        <div className="w-100 d-flex justify-content-center">
          <Button variant="success w-50 my-2" onClick={placeOrder}>
            Confirm Order
          </Button>
        </div>
        <Row>
          <Col>
            {" "}
            <div className="my-5 table-responsive-sm">
              <h4>Shipping Details</h4>
              <Table striped bordered hover size="sm" className="w-50">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Post Code</th>
                    <th>Country</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{state4.shippingInfo.fullname}</td>
                    <td>{state4.shippingInfo.address}</td>
                    <td>{state4.shippingInfo.city}</td>
                    <td>{state4.shippingInfo.postCode}</td>
                    <td>{state4.shippingInfo.country}</td>
                    <td>
                      <Button variant="success" onClick={handleShow}>
                        Click here
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Enter your Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form className="p-3">
                    <h3 className="text-center my-3">Shipping Form</h3>

                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={fullname}
                        placeholder="full name"
                        onChange={(e) => setFullname(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group my-3">
                      <label>Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="address"
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        value={address}
                      />
                    </div>
                    <div className="form-group my-3">
                      <label>Phone Number</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Phone number"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        value={phoneNumber}
                      />
                    </div>
                    <div className="form-group my-3">
                      <label>City</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="city"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        required
                      />
                    </div>
                    <div className="form-group my-3">
                      <label>Postal Code</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="postCode"
                        onChange={(e) => setPostCode(e.target.value)}
                        required
                        value={postCode}
                      />
                    </div>
                    <div className="form-group my-3">
                      <label>Country</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        value={country}
                      />
                    </div>

                    <button
                      className="btn btn-dark btn-md w-100 btn-block my-3"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <div className="my-5 table-responsive-sm">
              <h4>Payment Method</h4>
              <Table striped bordered hover size="sm" className="w-75">
                <thead>
                  <tr>
                    <th>Payment type</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{state5.paymentInfo}</td>

                    <td>
                      <Button variant="success" onClick={handleShow2}>
                        Click here
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                  <Modal.Title>Enter your Payment Method</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form className="p-3">
                    <Form className="mx-auto w-25 text-uppercase ">
                      <Form.Check
                        type="radio"
                        label="paypal"
                        value="paypal"
                        name="payment"
                        defaultChecked={
                          state5.paymentInfo === "paypal" ? "paypal" : ""
                        }
                        onChange={(e) => setPayment(e.target.value)}
                      />
                      <Form.Check
                        type="radio"
                        label="strip"
                        value="strip"
                        name="payment"
                        defaultChecked={
                          state5.paymentInfo === "strip" ? "strip" : ""
                        }
                        onChange={(e) => setPayment(e.target.value)}
                      />
                      <Form.Check
                        type="radio"
                        label="sslcommerz"
                        value="sslcommerz"
                        name="payment"
                        defaultChecked={
                          state5.paymentInfo === "sslcommerz"
                            ? "sslcommerz"
                            : ""
                        }
                        onChange={(e) => setPayment(e.target.value)}
                      />
                      <Button
                        className="w-100 btn-block my-3"
                        onClick={handleSubmit2}
                      >
                        Submit
                      </Button>
                    </Form>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={handleClose2}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Col>
          <Col>
            {state.cart.cartItems.length <= 0 ? (
              <Alert variant="danger" className="text-center">
                Cart is Empty
              </Alert>
            ) : (
              <Table
                striped
                bordered
                hover
                className="my-5 table-responsive-sm"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Quanity </th>
                    <th>Total </th>
                    <th>Remove</th>
                  </tr>
                </thead>
                {state.cart.cartItems.map((item, k) => {
                  return (
                    <>
                      <tr key={k}>
                        <td>{k + 1}</td>
                        <td>{item.name}</td>
                        <td>
                          <img
                            src={item.img}
                            alt={item.name}
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>{item.price}</td>

                        <td>
                          <div className="d-flex align-items-center gap-2 justify">
                            <Button
                              onClick={() =>
                                updateQuantity(item, item.quantity + 1)
                              }
                              disabled={
                                item.quantity >= item.stock ? true : false
                              }
                            >
                              <FaPlus />
                            </Button>
                            <h6>{item.quantity}</h6>
                            <Button
                              variant="warning"
                              onClick={() =>
                                updateQuantity(item, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1 ? true : false}
                            >
                              <FaMinus />
                            </Button>
                          </div>
                        </td>
                        <td>{item.quantity * item.price}</td>
                        <td>
                          <div>
                            <Button
                              variant="danger"
                              onClick={() => {
                                deleteItem(item._id);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </Table>
            )}

            <ListGroup>
              <ListGroup.Item variant="primary">
                <h5>Cart Summary</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                Total Items in Cart:{" "}
                {state.cart.cartItems.reduce(
                  (acc, cur) => acc + cur.quantity,
                  0
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                Total Amount:
                {discount ? (
                  <>
                    {" "}
                    <del>{totalPrice}</del>
                    <span> {discount}</span>
                  </>
                ) : (
                  totalPrice
                )}
              </ListGroup.Item>
              <ListGroup.Item>Shipping: $0</ListGroup.Item>
              <ListGroup.Item>tax: $ {tax}</ListGroup.Item>
              <ListGroup.Item>
                total: $ {totalPrice + tax + shipping}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ConfirmOrder;
