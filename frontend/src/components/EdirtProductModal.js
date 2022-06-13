import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { ContentState, convertFromHTML, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const EdirtProductModal = ({ show, handleClose, token, id }) => {
  let [productname, setProductname] = useState("");
  let [cat, setCat] = useState("");
  let [text, setText] = useState("");
  let [price, setPrice] = useState("");
  let [stock, setStock] = useState("");
  let [coupon, setCoupon] = useState("");
  let [discount, setDiscount] = useState("");
  let [discountLimit, setDiscountLimit] = useState("");
  let [loading, setLoading] = useState(true);
  let [editSuccess, setEditSuccess] = useState(false);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleSubmit = async () => {
    let { data } = await axios.post(
      `/products/editownerproduct/${id}`,
      {
        name: productname,
        price,
        category: cat,
        instock: stock,
        description: text,
        coupon: coupon,
        discount: discount,
        discountlimit: discountLimit,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (data) {
      setProductname("");
      setCat("");
      setText("");
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(text))
        )
      );
      setPrice("");
      setStock("");
      setCoupon("");
      setDiscount("");
      setDiscountLimit("");
      setEditSuccess(true);
      handleClose();
    }
  };

  useEffect(() => {
    if (editSuccess) {
      setEditSuccess(false);
    }
  }, [editSuccess]);
  useEffect(() => {
    if (show) {
      async function Store() {
        let { data } = await axios.get(`/products/getownerproduct/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        if (data) {
          setProductname(data[0].name);
          setCat(data[0].category);
          setText(data[0].description);
          setEditorState(
            EditorState.createWithContent(
              ContentState.createFromBlockArray(convertFromHTML(text))
            )
          );
          setPrice(data[0].price);
          setStock(data[0].instock);
          setCoupon(data[0].coupon);
          setDiscount(data[0].discount);
          setDiscountLimit(data[0].discountlimit);
          setLoading(false);
        }
      }

      Store();
    }
  }, [show]);

  //rich text editor

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          "loading"
        ) : (
          <Form className="w-75 my-4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={productname}
                placeholder="Product name"
                onChange={(e) => setProductname(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Category</Form.Label>
              <Form.Control
                value={cat}
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
                value={price}
                placeholder="Product Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={stock}
                placeholder="Product Stock"
                onChange={(e) => setStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Coupon</Form.Label>
              <Form.Control
                type="text"
                value={coupon}
                placeholder="Product Cupon"
                onChange={(e) => setCoupon(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                value={discount}
                placeholder="Product Discount"
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Discount limit</Form.Label>
              <Form.Control
                type="number"
                value={discountLimit}
                placeholder="Product Discount limit"
                onChange={(e) => setDiscountLimit(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit Product
            </Button>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EdirtProductModal;
