import React, { useReducer } from "react";
import { Modal } from "react-bootstrap";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import Ratings from "../components/Ratings";
import { useStore } from "../Store";
import axios from "axios";

const initialState = { loading: false, product: [], error: false };

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        product: action.payload,
        error: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}

function ProductModal({ slug, lgShow, setLgShow }) {
  const { state, dispatch: ctxDispatch } = useStore();
  const { cart } = state;
  const [{ product, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  React.useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const tempProducts = await axios.get(`/products/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: tempProducts.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };

    getProduct();
  }, [slug]);

  const handleAddtoCart = async () => {
    const existingItem = cart.cartItems.find(
      (item) => item._id === product._id
    );
    let quantity = existingItem ? existingItem.quantity + 1 : 1;

    if (product.stock < quantity) {
      quantity = product.stock;
      return window.alert("No Stock left");
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
  };
  return (
    <Modal
      size="lg"
      show={lgShow}
      onHide={() => setLgShow(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {product.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <div className="my-5 py-5">
          {product ? (
            <Container>
              <Row>
                <Col lg={5}>
                  {product.img ? (
                    <InnerImageZoom
                      src={product.img}
                      zoomSrc={product.img}
                      zoomType="hover"
                    />
                  ) : (
                    ""
                  )}
                </Col>
                <Col lg={4}>
                  <div>
                    <p className="text-muted">Product Price: {product.price}</p>
                    <Ratings
                      ratings={product.ratings}
                      numberOfRatings={product.numberOfRatings}
                    ></Ratings>
                    <p>Description: {product.description}</p>
                  </div>
                </Col>
                <Col lg={3}>
                  <h5 className="text-center">Your Cart</h5>{" "}
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <td>Item</td>
                        <td>Amount</td>
                        <td>Price</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{product.name}</td>
                        <td>1</td>
                        <td>{product.price}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <div className="text-center">
                    <Button className="bg-dark m-2" onClick={handleAddtoCart}>
                      Add to Cart{" "}
                    </Button>
                    <Link to="/cart">
                      <Button variant="success" className="m-2">
                        Go to Cart
                      </Button>
                    </Link>
                  </div>
                </Col>
              </Row>
            </Container>
          ) : (
            <Alert variant="warning" className="text-center">
              <p> No Such Product Exists !!! Search Another Product</p>
              <h3>
                {" "}
                <Link to="/products">Go Back</Link>
              </h3>
            </Alert>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ProductModal;
