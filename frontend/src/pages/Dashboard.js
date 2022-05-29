import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Nav, Form, Button } from "react-bootstrap";
import { useStore } from "../Store";
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
function Dashboard() {
  const { state3 } = useStore();
  let [storename, setStorename] = useState("");
  let [category, setCategory] = useState(true);
  let [name, setName] = useState("");
  let [pro, setPro] = useState(false);

  //text

  let [text, setText] = useState("");

  //rich text editor
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

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
  };

  //useEffect
  useEffect(() => {
    async function Store() {
      let { data } = await axios.get(`/store`, {
        headers: {
          authorization: `Bearer ${state3.userInfo.token}`,
        },
      });

      setStorename(data[0].name);
    }

    Store();
  }, []);

  let handleProductSubmit = async () => {
    let { data } = await axios.post("/products", {});
  };

  return (
    <>
      <Row>
        <Col xs={4}>
          <Nav className="flex-column">
            <Nav.Link
              onClick={() => {
                setCategory(true);
                setPro(false);
              }}
            >
              Create Product
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                setCategory(false);
                setPro(true);
              }}
            >
              Create category
            </Nav.Link>
            <Nav.Link>Create Subcategory</Nav.Link>
            <Nav.Link>Payment</Nav.Link>
          </Nav>
        </Col>
        <Col xs={8}>
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
          {pro && (
            <Form className="w-75 my-4">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Product name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Slug</Form.Label>
                <Form.Control type="text" placeholder="Product Slug" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" placeholder="Product Image" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" placeholder="Product Category" />
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
                <Form.Control type="number" placeholder="Product Price" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Stock</Form.Label>
                <Form.Control type="number" placeholder="Product Stock" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Coupon</Form.Label>
                <Form.Control type="number" placeholder="Product Cupon" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Discount</Form.Label>
                <Form.Control type="number" placeholder="Product Discount" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Discount limit</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Product Discount limit"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Store Name</Form.Label>
                <Form.Control
                  placeholder="Disabled input"
                  disabled
                  value={storename}
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
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
