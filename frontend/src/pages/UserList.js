import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Table, Button } from "react-bootstrap";
import AdminNavbar from "../components/AdminNavbar";
import { useStore } from "../Store";

function UserList({ active }) {
  let [userlist, setUserList] = useState([]);
  const { state3 } = useStore();

  useEffect(() => {
    if (state3) {
      async function userlist() {
        let { data } = await axios.get("/users/getUsers", {
          headers: {
            authorization: `Bearer ${state3.userInfo.token}`,
          },
        });

        console.log("data", data);
        setUserList(data);
      }
      userlist();
    }
  }, [state3]);

  console.log(userlist);
  return (
    <Container>
      <Row>
        <Col lg={3}>
          <AdminNavbar active="userlist" />
        </Col>
        <Col lg={9}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Serial</th>
                <th>Name</th>
                <th>Email</th>
                <th>Position</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userlist.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    {item.isVendor
                      ? "vendor"
                      : item.isAffiliate
                      ? "Affiliate"
                      : ""}{" "}
                  </td>
                  <td>
                    {" "}
                    <Button variant="danger">Delete</Button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default UserList;
