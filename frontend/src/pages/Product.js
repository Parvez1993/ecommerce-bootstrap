import React, { useEffect, useReducer, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import Ratings from "../components/Ratings";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useStore } from "../Store";
import { FaPlus, FaMinus } from "react-icons/fa";
import ProductModal from "../components/ProductModal";

const initialState = {
  loading: false,
  products: [],
  error: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}

function Product() {
  const { state, dispatch: ctxDispatch, state2, dispatch2 } = useStore();
  const [productSlug, setProductSlug] = useState("");
  const [lgShow, setLgShow] = useState(false);
  const { cart } = state;
  const [{ products, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const tempProducts = await axios.get("/products");
        dispatch({ type: "FETCH_SUCCESS", payload: tempProducts.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };

    getProducts();
  }, []);

  const handleModal = (path) => {
    setLgShow(true);
    setProductSlug(path);
  };
  const updateQuantity = (item, quantity) => {
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const handleAddtoCart = async (product) => {
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

  //handleWishList
  const handleWishList = (product) => {
    dispatch2({
      type: "WISHLIST_ADD_ITEM",
      payload: { ...product },
    });
  };
  return (
    <div>
      {loading ? (
        <Spinner animation="grow" />
      ) : (
        <Container>
          <Helmet>
            <title>Products</title>
          </Helmet>
          <div className="row">
            {products.map((item, k) => {
              const {
                name,
                description,
                price,
                img,
                ratings,
                numberOfRatings,
                slug,
              } = item;

              return (
                <div className="col-lg-3 col-md-6 mb-4 mb-lg-0 my-3">
                  <div className="card rounded shadow-sm border-0">
                    <div className="card-body p-4">
                      <img
                        src={img}
                        alt={name}
                        className="img-fluid d-block mx-auto mb-3"
                      />
                      <Link to={`/products/${slug}`}>
                        <h5>{name}</h5>
                      </Link>
                      <div>
                        <Ratings
                          ratings={ratings}
                          numberOfRatings={numberOfRatings}
                        ></Ratings>
                      </div>
                      <p className="small text-muted font-italic">
                        {description}
                      </p>
                      <h4 className="small text-muted font-bold">${price}</h4>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Button
                          variant="secondary"
                          onClick={() => handleModal(slug)}
                        >
                          Details
                        </Button>
                      </div>
                      <ProductModal
                        slug={productSlug}
                        lgShow={lgShow}
                        setLgShow={setLgShow}
                      />
                      <Button
                        variant="secondary"
                        onClick={() => handleWishList(item)}
                      >
                        WishList
                      </Button>
                      <div>
                        {" "}
                        {state.cart.cartItems.map((itemz) => {
                          return itemz._id === item._id ? (
                            <>
                              <div className="d-flex align-items-center gap-2 justify-content-center">
                                <Button
                                  onClick={() =>
                                    updateQuantity(itemz, itemz.quantity + 1)
                                  }
                                  disabled={
                                    itemz.quantity >= item.stock ? true : false
                                  }
                                >
                                  <FaPlus />
                                </Button>
                                <h6>{itemz.quantity}</h6>
                                <Button
                                  variant="warning"
                                  onClick={() =>
                                    updateQuantity(itemz, itemz.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1 ? true : false}
                                >
                                  <FaMinus />
                                </Button>
                              </div>
                            </>
                          ) : (
                            ""
                          );
                        })}
                      </div>
                    </div>
                    <div className="my-2">
                      {item.stock === 0 ? (
                        <Button className="bg-dark w-100" disabled>
                          Out of stock
                        </Button>
                      ) : (
                        <Button
                          className="bg-dark w-100"
                          onClick={() => handleAddtoCart(item)}
                        >
                          Add to Cart{" "}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      )}
    </div>
  );
}

export default Product;
