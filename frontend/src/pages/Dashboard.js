import React, { useContext, useEffect, useState } from "react";
import {
  Row,
  Col,
  Nav,
  Form,
  Button,
  Alert,
  Table,
  Badge,
} from "react-bootstrap";
import { useStore } from "../Store";
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import EdirtProductModal from "../components/EdirtProductModal";
function Dashboard() {
  //create Modals

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { state3 } = useStore();
  let [storename, setStorename] = useState("");
  let [category, setCategory] = useState(true);
  let [name, setName] = useState("");
  let [pro, setPro] = useState(false);
  let [productlist, setproductList] = useState("false");
  let [alert, setAlert] = useState("");
  //text

  //productdetails

  let [productname, setProductname] = useState("");
  let [slug, setSlug] = useState("");
  let [image, setImage] = useState("");
  let [cat, setCat] = useState("");
  let [text, setText] = useState("");
  let [price, setPrice] = useState("");
  let [stock, setStock] = useState("");
  let [coupon, setCoupon] = useState("");
  let [discount, setDiscount] = useState("");
  let [discountLimit, setDiscountLimit] = useState("");
  let [ownerProducts, setOwnerProducts] = useState("");
  //rich text editor
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  //edit details
  const [editId, setEditId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "/store",
      {
        name: name,
      },
      {
        headers: {
          authorization: `Bearer ${state3.userInfo.token}`,
        },
      }
    );

    setAlert("");
  };

  //useEffect to get store
  useEffect(() => {
    async function Store() {
      let { data } = await axios.get(`/store`, {
        headers: {
          authorization: `Bearer ${state3.userInfo.token}`,
        },
      });

      if (data.length > 0) {
        setStorename(data[0]);
      } else {
        setAlert("Please create a store first");
        setCategory(true);
        setPro(false);
        setproductList(false);
      }
    }

    Store();
  }, []);

  //useEffect to get ownerProducts
  useEffect(() => {
    async function Store() {
      let { data } = await axios.get(`/products/getownerproduct`, {
        headers: {
          authorization: `Bearer ${state3.userInfo.token}`,
        },
      });

      if (data.length > 0) {
        setOwnerProducts(data);
      } else {
        setAlert("No product List");
        setCategory(false);
        setPro(false);
        setproductList(true);
      }
    }

    Store();
  }, [editId]);

  console.log(
    productname,
    slug,
    image,
    cat,
    text,
    price,
    stock,
    coupon,
    discount,
    discountLimit,
    storename.name,
    storename._id
  );

  let handleProductSubmit = async (e) => {
    e.preventDefault();

    let { data } = await axios.post(
      "/products",
      {
        name: productname,
        slug: slug,
        img: image,
        category: cat,
        description: text,
        price: price,
        instock: stock,
        discount: discount,
        discountlimit: discountLimit,
        storename: storename._id,
      },
      {
        headers: {
          authorization: `Bearer ${state3.userInfo.token}`,
        },
      }
    );
  };

  return (
    <>
      <Row>
        <Col xs={4}>
          <Nav className="flex-column">
            <Nav.Link
              onClick={() => {
                setCategory(false);
                setPro(true);
                setproductList(false);
              }}
            >
              Create Product
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                setCategory(true);
                setPro(false);
                setproductList(false);
              }}
            >
              Create Store
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                setCategory(false);
                setPro(false);
                setproductList(true);
              }}
            >
              Product List
            </Nav.Link>
            <Nav.Link>Payment</Nav.Link>
          </Nav>
        </Col>
        <Col xs={8}>
          {alert ? (
            <Alert variant="danger" className="w-75 my-2">
              {alert}
            </Alert>
          ) : (
            ""
          )}
          {category && (
            <Form className="w-75 my-4">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Store Name</Form.Label>
                <Form.Control
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Create Store"
                />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          )}

          {/* ///create product */}
          {pro && !alert && (
            <Form className="w-75 my-4">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product name"
                  onChange={(e) => setProductname(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Slug</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product Slug"
                  onChange={(e) => setSlug(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product Image"
                  onChange={(e) => setImage(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product Category"
                  onChange={(e) => setCat(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Description</Form.Label>
                <Editor
                  editorState={editorState}
                  wrapperClassName="card"
                  editorClassName="card-body"
                  onEditorStateChange={(newState) => {
                    setEditorState(newState);
                    setText(
                      draftToHtml(convertToRaw(newState.getCurrentContent()))
                    );
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Product Price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Product Stock"
                  onChange={(e) => setStock(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Coupon</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product Cupon"
                  onChange={(e) => setCoupon(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Product Discount"
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Discount limit</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Product Discount limit"
                  onChange={(e) => setDiscountLimit(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Store Name</Form.Label>
                <Form.Control
                  placeholder="Disabled input"
                  disabled
                  value={storename.name}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                onClick={handleProductSubmit}
              >
                Submit Product
              </Button>
            </Form>
          )}
          {productlist && !alert && (
            <>
              {ownerProducts
                ? ownerProducts.map((i, k) => {
                    const { description } = i;
                    return (
                      <Table>
                        <thead>
                          <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Coupon</th>
                            <th scope="col">Discount</th>
                            <th scope="col">Discout Limit</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="col">{k + 1}</th>
                            <th scope="col">{i.name}</th>
                            <th scope="col">{i.category}</th>
                            <th scope="col">
                              {" "}
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: description,
                                }}
                              ></div>
                            </th>
                            <th scope="col">{i.price}</th>
                            <th scope="col">{i.coupon ? i.coupon : "none"}</th>
                            <th scope="col">{i.discount}</th>
                            <th scope="col">{i.discountlimit}</th>
                            <th scope="col">
                              <Badge bg="danger">Delete</Badge>
                            </th>
                            <th scope="col">
                              <Badge
                                bg="danger"
                                onClick={() => {
                                  handleShow();
                                  setEditId(i._id);
                                }}
                              >
                                Edit
                              </Badge>
                            </th>
                          </tr>
                        </tbody>
                      </Table>
                    );
                  })
                : ""}
            </>
          )}
        </Col>
      </Row>
      <EdirtProductModal
        show={show}
        handleClose={handleClose}
        token={state3.userInfo.token}
        id={editId}
      />
    </>
  );
}

export default Dashboard;
