import React from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Table,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useStore } from "../Store";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import offer from "../offer";
function Cart() {
  const { state, dispatch, state3 } = useStore();
  const [coupon, setCoupon] = useState("");
  //discounted price
  const [discount, setDiscount] = useState("");

  console.log("discount", discount);

  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();
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

  //coupon

  const applyCoupon = () => {
    if (offer.find((i) => i.coupon === coupon)) {
      let productTemp = offer.find((i) => i.coupon === coupon);

      let total = state.cart.cartItems.reduce(
        (acc, cur) => acc + cur.quantity * cur.price,
        0
      );
      console.log(total, productTemp.purchase);
      if (total > productTemp.purchase) {
        var price = total;
        var discount = productTemp.discount / 100;
        var totalValue = price - price * discount;
        console.log(totalValue);
        setDiscount(totalValue);
        setAlert("successfully applied");
      } else {
        setAlert(
          `Purchase above ${productTemp.purchase} to get the ${productTemp.discount}% Offer`
        );
      }
    } else {
      setAlert("No such code exists");
    }
  };
  const handleCheckout = () => {
    const route =
      state3.userInfo === null ? "login?redirect=shipping" : "shipping";
    navigate(`/${route}`);
  };
  return (
    <>
      <Helmet>
        <title>Cart Page</title>
      </Helmet>
      <Container>
        {alert ? (
          <Alert variant="danger" className="my-3">
            {alert}
          </Alert>
        ) : (
          ""
        )}
        <Row className="my-5">
          <Col lg={8}>
            {state.cart.cartItems.length <= 0 ? (
              <Alert variant="danger" className="text-center">
                Cart is Empty
              </Alert>
            ) : (
              <Table striped bordered hover>
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
                {state.cart.cartItems.map((item) => {
                  return (
                    <>
                      <tr>
                        <td>{item._id}</td>
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
          </Col>
          <Col lg={4}>
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
                Total Amount:{" "}
                {discount ? (
                  <>
                    {" "}
                    <del>
                      {state.cart.cartItems.reduce(
                        (acc, cur) => acc + cur.quantity * cur.price,
                        0
                      )}
                    </del>
                    <span> {discount}</span>
                  </>
                ) : (
                  state.cart.cartItems.reduce(
                    (acc, cur) => acc + cur.quantity * cur.price,
                    0
                  )
                )}
              </ListGroup.Item>
              {/* coupon */}
              <ListGroup.Item>
                <div className="mt-3">
                  <Form.Control
                    type="text"
                    name="coupon"
                    placeholder="enter your coupon code"
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <Button
                    variant="success"
                    className="mt-2 w-100"
                    onClick={() => applyCoupon()}
                  >
                    Apply Coupon
                  </Button>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className="w-100" onClick={handleCheckout}>
                  Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Cart;
