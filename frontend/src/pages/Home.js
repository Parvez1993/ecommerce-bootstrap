import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import {
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
  Row,
  Container,
} from "react-bootstrap";
import "../css/Home.css";
import Ratings from "../components/Ratings";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
function Home() {
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState("");
  const [allproducts, setAllproducts] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get("/products");
        setProducts(data);
        setAllproducts(data);
        setLoading(false);
      } catch (error) {
        console.log("");
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    if (products.length > 1 && loading) {
      const getImg = async () => {
        const { data } = await axios.get("/discount");
        setImg(data);
      };

      getImg();
    }
  }, [products, loading]);

  let tempArr = [];
  useEffect(() => {
    const getCat = async () => {
      const { data } = await axios.get("/products");

      // eslint-disable-next-line array-callback-return
      data.map((item) => {
        if (tempArr.indexOf(item.category) === -1) {
          tempArr.push(item.category);
        }

        setCategory(tempArr);
      });
    };

    getCat();
  }, []);

  //modal

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  //handle category

  const handleCategory = async (e) => {
    setLoader(true);
    let temp = e.target.value;
    if (temp === "all") {
      setProducts(allproducts);
    } else {
      const { data } = await axios.get(`/category/${temp}`);

      setProducts(data);
    }

    setLoader(false);
  };
  const searchArray = [];

  const handleSearch = (e) => {
    // eslint-disable-next-line array-callback-return

    products.map((item) => {
      if (item.name.toLowerCase().includes(e.target.value)) {
        searchArray.push(item);
      }
    });

    setSearchResult(searchArray);
  };

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div className="cover"></div>

      <div className="search_bar">
        <Container>
          <Form.Control
            size="lg"
            type="text"
            placeholder="Search by keyword"
            onChange={handleSearch}
          />
        </Container>
      </div>
      {category ? (
        <div className="w-25 mx-auto my-5">
          <Form.Select
            aria-label="Default select example"
            default={"all"}
            onChange={(e) => handleCategory(e)}
          >
            <option value="all">All</option>
            {category.map((i) => (
              <option value={i} key={i}>
                {i}
              </option>
            ))}
          </Form.Select>
        </div>
      ) : (
        <div className="d-flex justify-content-center w-100">
          <Spinner animation="border" role="status">
            <span>Loading...</span>
          </Spinner>
        </div>
      )}

      {loader ? (
        <div className="d-flex justify-content-center w-100">
          <Spinner animation="border" role="status">
            <span>Loading...</span>
          </Spinner>
        </div>
      ) : products ? (
        <Row>
          {searchResult.length > 0
            ? searchResult.map((item, k) => {
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
                  <div className="col-lg-3 col-md-6 mb-4 mb-lg-0 my-3" key={k}>
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
              })
            : products.map((item, k) => {
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
                  <div className="col-lg-2 col-md-6 mb-4 mb-lg-0 my-3">
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
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
              <div>
                <img
                  src={img.img}
                  alt="discount"
                  style={{ height: "200px", width: "100%" }}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>
      ) : products ? (
        ""
      ) : (
        ""
      )}
    </>
  );
}

export default Home;
