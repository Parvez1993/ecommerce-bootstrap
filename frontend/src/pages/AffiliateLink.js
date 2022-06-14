import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";

const AffiliateLink = () => {
  let [product, setProduct] = useState([]);
  useEffect(() => {
    async function pro() {
      let product = await axios.get("/products");
      setProduct(product.data);
    }
    pro();
  }, []);
  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Serial</th>
            <th>Name</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {product.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>Copy Link</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AffiliateLink;
