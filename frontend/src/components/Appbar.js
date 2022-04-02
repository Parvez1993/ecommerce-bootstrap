import React from "react";
import {
  Badge,
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Table,
} from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useStore } from "../Store";

function Appbar() {
  const { state, dispatch, state2, state3, dispatch3 } = useStore();

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

  console.log(state.cart);

  const handleLogout = () => {
    dispatch3({
      type: "LOGOUT_USER",
    });
    localStorage.setItem("userInfo", null);
  };

  console.log("this", state3.userInfo);

  return (
    <Navbar bg="dark" expand="lg" className="text-white">
      <Container>
        <Navbar.Brand href="/" className="text-white">
          Spring Club
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/products" className="text-white">
              Products
            </Nav.Link>
            {state3.userInfo !== null ? (
              <Nav.Link className="text-white" onClick={handleLogout}>
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link href="/login" className="text-white">
                Login
              </Nav.Link>
            )}
            <Nav.Link href="/compare" className="text-white">
              Compare
            </Nav.Link>
            {/* //cart */}
            <div className="d-flex">
              <NavDropdown
                title={<span className="text-white my-auto">Cart</span>}
              >
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
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

                <NavDropdown.Divider />
                <NavDropdown.Item href="/cart">
                  <div className="text-center">
                    <Button className="primary w-100">Go to Cart</Button>
                  </div>
                </NavDropdown.Item>
              </NavDropdown>
              <div className="my-2">
                {" "}
                <Badge pill bg="success">
                  {state.cart ? state.cart.cartItems.length : 0}
                </Badge>
              </div>
            </div>

            {/* //whislist */}

            <div className="d-flex">
              <Nav.Link href="/wishlist" className="text-white">
                Wishlist
              </Nav.Link>
              <div className="my-2">
                <Badge pill bg="success">
                  {state2.wishlist ? state2.wishlist.wishlistItems.length : 0}
                </Badge>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Appbar;
