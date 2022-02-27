import React from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  ListGroup,
  Row,
  Table,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useStore } from "../Store";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Cart() {
  const { state, dispatch } = useStore();
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

  const handleCheckout = () => {
    navigate("/login?redirect=shipping");
  };
  return (
    <>
      <Helmet>
        <title>Cart Page</title>
      </Helmet>
      <Container>
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
                {state.cart.cartItems.reduce(
                  (acc, cur) => acc + cur.quantity * cur.price,
                  0
                )}{" "}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className="w-100" onClick={handleCheckout}>
                  Payment
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
