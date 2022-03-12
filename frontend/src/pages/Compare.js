import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import Ratings from "../components/Ratings";

function Compare() {
  const [product1, setProduct1] = useState("");
  const [product2, setProduct2] = useState("");

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

  const handleCompare1 = (slug) => {
    axios.get(`/products/${slug}`).then((data) => setProduct1(data.data));
  };

  const handleCompare2 = (slug) => {
    axios.get(`/products/${slug}`).then((data) => setProduct2(data.data));
  };

  //get all the products
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

  const [{ products, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div>
      <Container className="h-100">
        <Row>
          <Col
            lg={6}
            className="d-flex flex-column gap-3 align-items-center justify-content-center"
            style={{ height: "100vh" }}
          >
            <div>
              <h5>Choose Product</h5>
              <Dropdown className="text-center">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Compare
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {products.map((items) => (
                    <Dropdown.Item onClick={() => handleCompare1(items.slug)}>
                      {items.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div>
              {product1 ? (
                <div>
                  <h4 className="display-6">Item Name: {product1.name}</h4>
                  <p className="text-muted">Product Price: {product1.price}</p>
                  <Ratings
                    ratings={product1.ratings}
                    numberOfRatings={product1.numberOfRatings}
                  ></Ratings>
                  <p>Description: {product1.description}</p>
                </div>
              ) : (
                ""
              )}

              {product1 && product2 ? (
                product1.ratings > product2.ratings ? (
                  <h2>{`${product1.name} is the winner`}</h2>
                ) : product1.ratings === product2.ratings ? (
                  product1.price > product2.price ? (
                    <h2>{`${product1.name} is the winner`}</h2>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </Col>
          <Col
            lg={6}
            className="d-flex flex-column gap-3 align-items-center justify-content-center"
            style={{ height: "100vh" }}
          >
            <div>
              <h5>Choose Product</h5>
              <Dropdown className="text-center">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Compare
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {products.map((items) => (
                    <Dropdown.Item onClick={() => handleCompare2(items.slug)}>
                      {items.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div>
              {product2 ? (
                <div>
                  <h4 className="display-6">Item Name: {product2.name}</h4>
                  <p className="text-muted">Product Price: {product2.price}</p>
                  <Ratings
                    ratings={product2.ratings}
                    numberOfRatings={product2.numberOfRatings}
                  ></Ratings>
                  <p>Description: {product2.description}</p>
                </div>
              ) : (
                ""
              )}

              {product1 && product2 ? (
                product2.ratings > product1.ratings ? (
                  <h2>{`${product2.name} is the winner`}</h2>
                ) : product2.ratings === product1.ratings ? (
                  product2.price > product1.price ? (
                    <h2>{`${product2.name} is the winner`}</h2>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Compare;
