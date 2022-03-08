import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import "../css/Home.css";
function Home() {
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const getImg = async () => {
      const { data } = await axios.get("/discount");
      setImg(data);
    };

    getImg();
  }, []);
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

  console.log(img.img);
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div className="cover"></div>

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
      {category ? (
        <div className="w-25 mx-auto my-5">
          <Form.Select aria-label="Default select example" default={"all"}>
            <option value="all">All</option>
            {category.map((i) => (
              <option value={i} key={i}>
                {i}
              </option>
            ))}
            <option value="1">One</option>
          </Form.Select>
        </div>
      ) : (
        "Loading"
      )}
    </>
  );
}

export default Home;
