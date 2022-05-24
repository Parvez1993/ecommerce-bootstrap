import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Appbar from "./components/Appbar";
//cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css
import ProductDetails from "./pages/ProductDetails";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
// import Product from "./pages/Product";
import Cart from "./components/Cart";
import { BsFillCartCheckFill } from "react-icons/bs";
import React, { useState } from "react";
import { Offcanvas, Table, Button } from "react-bootstrap";
import { useStore } from "./Store";
import { FaPlus, FaMinus } from "react-icons/fa";
import Login from "./pages/Login";
import Compare from "./pages/Compare";
import Wishlist from "./pages/Wishlist";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import ConfirmOrder from "./components/ConfirmOrder";
import Order from "./pages/Order";
import History from "./pages/History";
const Product = React.lazy(() => import("./pages/Product"));
function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { state, dispatch } = useStore();

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

  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Table striped bordered hover className="w-25">
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
                          disabled={item.quantity >= item.stock ? true : false}
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
          <Button>
            <a href="/cart" className="text-white">
              Add to Cart
            </a>
          </Button>
        </Offcanvas.Body>
      </Offcanvas>

      <BrowserRouter>
        <Appbar />

        <BsFillCartCheckFill
          style={{ fontSize: "40px" }}
          className="blob cart_icon"
          onClick={handleShow}
        />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/products"
            element={
              <React.Suspense
                fallback={
                  <>
                    <h3>Loading</h3>
                  </>
                }
              >
                <Product />
              </React.Suspense>
            }
          ></Route>
          <Route path="/products/:slug" element={<ProductDetails />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/compare" element={<Compare />}></Route>
          <Route path="/wishlist" element={<Wishlist />}></Route>
          <Route path="/shipping" element={<Shipping />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/confirm" element={<ConfirmOrder />}></Route>
          <Route path="/order/:id" element={<Order />}></Route>
          <Route path="/history" element={<History />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
