import React, { useEffect, useReducer, useState } from "react";
import { Badge, Button, Container, Spinner } from "react-bootstrap";
import Ratings from "../components/Ratings";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useStore } from "../Store";
import { FaPlus, FaMinus } from "react-icons/fa";
import ProductModal from "../components/ProductModal";
import InnerHTML from "dangerously-set-html-content";

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
  const { state, dispatch: ctxDispatch, state3, dispatch2 } = useStore();
  const [productSlug, setProductSlug] = useState("");
  const [lgShow, setLgShow] = useState(false);
  const [flipped, setFlipped] = useState(false);
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
        console.log(tempProducts);
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

    if (product.stock <= quantity) {
      quantity = product.stock;
      return window.alert("No Stock left");
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
  };

  console.log("products", products);

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
                totalSales,
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
                      {state3.userInfo ? (
                        <Link
                          to={
                            state3.userInfo.user.isAffiliate
                              ? `/products/${item.slug}?name:${state3.userInfo.user.name}`
                              : `/products/${item.slug}`
                          }
                        >
                          {item.name}{" "}
                          {item.totalSale > 50 ? (
                            <Badge bg="warning">Best Seller</Badge>
                          ) : (
                            ""
                          )}
                        </Link>
                      ) : (
                        <Link to={`/products/${item.slug}`}>
                          {item.name}{" "}
                          {item.totalSale > 50 ? (
                            <Badge bg="warning">Best Seller</Badge>
                          ) : (
                            ""
                          )}
                        </Link>
                      )}

                      <div>
                        <Ratings
                          ratings={ratings}
                          numberOfRatings={numberOfRatings}
                        ></Ratings>
                      </div>
                      {/* <p className="small text-muted font-italic">
                        {description}
                      </p> */}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: description,
                        }}
                      ></div>

                      <h4 className="small text-muted font-bold">${price}</h4>
                    </div>
                    <div className="d-flex justify-content-around align-items-center w-100">
                      <Button
                        variant="secondary"
                        onClick={() => handleModal(slug)}
                      >
                        Details
                      </Button>

                      <Button
                        variant="secondary"
                        onClick={() => handleWishList(item)}
                      >
                        WishList
                      </Button>

                      <ProductModal
                        slug={productSlug}
                        lgShow={lgShow}
                        setLgShow={setLgShow}
                      />
                    </div>
                    {state.cart.cartItems.map((itemz) => {
                      return itemz._id === item._id ? (
                        <>
                          <div className="d-flex align-items-center gap-2 justify-content-center mt-2">
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
                              disabled={itemz.quantity <= 0 ? true : false}
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
                  <div>
                    {totalSales > 100 ? (
                      <span class="badge badge-pill badge-warning">
                        Best Seller
                      </span>
                    ) : (
                      ""
                    )}
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
