import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import Ratings from "../components/Ratings";
import { Helmet } from "react-helmet-async";
import { useStore } from "../Store";
import ProductModal from "../components/ProductModal";
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

function ProductDetails() {
  const [relatedProducts, setRelatedProducts] = useState("");
  const [loader, setLoader] = useState(false);
  const { state, dispatch: ctxDispatch } = useStore();
  const { cart } = state;
  const [{ product, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { slug } = useParams();

  //for related products
  const [productSlug, setProductSlug] = useState("");
  const [lgShow, setLgShow] = useState(false);

  const handleModal = (path) => {
    setLgShow(true);
    setProductSlug(path);
  };

  React.useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const tempProducts = await axios.get(`/products/${slug}`);
        console.log(tempProducts);
        dispatch({ type: "FETCH_SUCCESS", payload: tempProducts.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };

    getProduct();
  }, [slug]);

  //get all the products

  useEffect(() => {
    const getProducts = async () => {
      setLoader(true);
      try {
        const { data } = await axios.get("/products");
        let tempRelatedProduct = data.filter(
          (item) =>
            item.category === product.category && item.name !== product.name
        );
        setRelatedProducts(tempRelatedProduct);
        setLoader(false);
      } catch (error) {
        setLoader(false);
      }
    };

    getProducts();
  }, [product.category, product.name]);

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
    <>
      <div className="mt-5 pt-5">
        {product ? (
          <Container>
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
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
                  <h4 className="display-6">Item Name: {product.name}</h4>
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
                <Button className="bg-dark" onClick={handleAddtoCart}>
                  Add to Cart{" "}
                </Button>
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

      <Row className="mt-5">
        <Col>
          <h4 className="display-6">Products you may be Interested In</h4>
          {loader ? (
            <Spinner
              animation="border"
              role="status"
              className="text-center"
            ></Spinner>
          ) : relatedProducts ? (
            relatedProducts.map((item) => {
              return (
                <div className="row">
                  {" "}
                  <div className="col-lg-3 col-md-6 mb-4 mb-lg-0 my-3">
                    <div
                      className="card rounded shadow-sm border-0"
                      style={{ width: "250px" }}
                    >
                      <div className="card-body p-4">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="img-fluid d-block mx-auto mb-3"
                        />
                        <Link to={`/products/${item.slug}`}>
                          <h5>{item.name}</h5>
                        </Link>
                        <div>
                          <Ratings
                            ratings={item.ratings}
                            numberOfRatings={item.numberOfRatings}
                          ></Ratings>
                        </div>
                        <p className="small text-muted font-italic">
                          {item.description}
                        </p>
                        <h4 className="small text-muted font-bold">
                          ${item.price}
                        </h4>
                      </div>

                      <div>
                        <Button
                          variant="secondary"
                          onClick={() => handleModal(item.slug)}
                          size="sm"
                          className="w-100"
                        >
                          Details
                        </Button>
                      </div>
                      <ProductModal
                        slug={productSlug}
                        lgShow={lgShow}
                        setLgShow={setLgShow}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            ""
          )}
        </Col>
      </Row>
    </>
  );
}

export default ProductDetails;
