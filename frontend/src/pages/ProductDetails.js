import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { Link, useParams, useSearchParams } from "react-router-dom";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import Ratings from "../components/Ratings";
import { Helmet } from "react-helmet-async";
import { useStore } from "../Store";
import ProductModal from "../components/ProductModal";
import Slider from "react-slick";

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

function reducer2(state, action) {
  switch (action.type) {
    case "PRODUCT_CREATE_REVIEW_BEGIN":
      return { ...state, loading: true };
    case "PRODUCT_CREATE_REVIEW_SUCCESS":
      return { ...state, loading: false, success: true };
    case "PRODUCT_CREATE_REVIEW_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PRODUCT_CREATE_REVIEW_RESET":
      return {};
    default:
      return state;
  }
}

function ProductDetails() {
  const [relatedProducts, setRelatedProducts] = useState("");
  const [coupon, setCoupon] = useState("");
  const [loader, setLoader] = useState(false);
  const { state, dispatch: ctxDispatch, state3 } = useStore();
  const [alert, setAlert] = useState(false);
  const { cart } = state;
  const [render, setRender] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  //discounted price
  const [discount, setDiscount] = useState("");
  const [{ product, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [searchParams] = useSearchParams();

  let id = searchParams.get("id");

  const [
    { success: successReview, loading: loadingReview, error: errorReview },
    dispatch2,
  ] = useReducer(reducer2, {
    success: false,
    loading: false,
    error: "",
  });
  const { slug } = useParams();

  const { description } = product;

  //for related products
  const [productSlug, setProductSlug] = useState("");
  const [lgShow, setLgShow] = useState(false);

  const handleModal = (path) => {
    setLgShow(true);
    setProductSlug(path);
  };

  useEffect(() => {}, [slug]);

  useEffect(() => {
    if (successReview) {
      setRating(0);
      setComment("");
    }

    let affiName;

    if (id) {
      affiName = id;
    }

    if (!product || !product.slug || product.slug !== slug) {
      const getProduct = async () => {
        dispatch({ type: "FETCH_REQUEST" });
        try {
          const tempProducts = await axios.get(
            `/products/${slug}?id=${affiName}`
          );
          console.log(tempProducts);
          dispatch({ type: "FETCH_SUCCESS", payload: tempProducts.data });
        } catch (error) {
          dispatch({ type: "FETCH_FAIL" });
        }
      };

      getProduct();
      dispatch({ type: "PRODUCT_CREATE_REVIEW_RESET" });
    }

    if (render) {
      setRender(false);
    }
  }, [dispatch, slug, successReview, render]);

  //get all the products

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
      payload: {
        ...product,
        quantity,
        price: discount ? discount : product.price,
      },
    });
  };

  const submitHandler = async (e, id, review) => {
    e.preventDefault();
    try {
      dispatch2({ type: " PRODUCT_CREATE_REVIEW_BEGIN" });

      const { data } = await axios.post(
        `/products/${id}/reviews`,
        {
          rating,
          comment,
        },
        {
          headers: {
            authorization: `Bearer ${state3.userInfo.token}`,
          },
        }
      );
      dispatch2({ type: "PRODUCT_CREATE_REVIEW_SUCCESS", payload: data });
      setRender(true);
    } catch (error) {
      dispatch2({
        type: "PRODUCT_CREATE_REVIEW_FAIL",
        payload: error.response.data.msg,
      });
    }
  };

  //react slick settings

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    speed: 500,
    adaptiveHeight: true,
  };

  const applyCoupon = () => {
    if (product.coupon === coupon) {
      var price = product.price;
      var discount = product.discount / 100;
      var totalValue = price - price * discount;
      setDiscount(totalValue);
    } else {
      setAlert(true);
    }
  };

  return (
    <>
      {alert ? <Alert>The Coupon does not Exists !!!</Alert> : ""}
      {errorReview ? <Alert>{errorReview}</Alert> : ""}
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
                  <p className="text-muted">
                    Product Price:{" "}
                    {discount ? <del>{product.price}</del> : product.price}
                  </p>
                  <p>{discount ? discount : ""}</p>
                  <Ratings
                    ratings={product.ratings}
                    numberOfRatings={product.numberOfRatings}
                  ></Ratings>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  ></div>
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
                      <td>
                        {" "}
                        {discount ? (
                          <del>{product.price}</del>
                        ) : (
                          product.price
                        )}{" "}
                        {discount}
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Button className="bg-dark" onClick={handleAddtoCart}>
                  Add to Cart{" "}
                </Button>
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
              </Col>
              <Col lg={12}>
                <div className="my-4">
                  <h5>Write a Customer Review</h5>
                </div>
                <div>
                  {product
                    ? product.reviews
                      ? product.reviews.map((review) => (
                          <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Ratings
                              ratings={review.rating}
                              numberOfRatings={product.numberofrating}
                            />
                            <strong>{review.comment}</strong>
                          </ListGroup.Item>
                        ))
                      : ""
                    : ""}
                </div>
                {state3.userInfo !== null ? (
                  <Form>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        row="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button
                      disabled={loadingReview}
                      type="submit"
                      variant="primary"
                      onClick={(e) => submitHandler(e, product._id, comment)}
                    >
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <Alert>
                    Please <Link to="/login">sign in</Link> to write a review{" "}
                  </Alert>
                )}
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
          <h4 className="display-6 text-center">
            Products you may be Interested In
          </h4>
          {loader ? (
            <Spinner
              animation="border"
              role="status"
              className="text-center"
            ></Spinner>
          ) : relatedProducts ? (
            <div className="d-flex w-100 justify-content-center">
              <div style={{ width: "60%" }}>
                <Slider {...settings}>
                  {relatedProducts.map((item) => {
                    return (
                      <div
                        className="card rounded shadow-sm border-0 custom-card-slick px-3"
                        key={item._id}
                      >
                        <div className="card-body p-4" style={{ width: 400 }}>
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
                          <div
                            dangerouslySetInnerHTML={{
                              __html: description,
                            }}
                          ></div>
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
                    );
                  })}
                </Slider>
              </div>
            </div>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </>
  );
}

export default ProductDetails;
