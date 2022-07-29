import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import AdminNavbar from "../components/AdminNavbar";
import { useStore } from "../Store";
function Dashboard() {
  return (
    <Container>
      <Row>
        <Col lg={3}>
          <AdminNavbar active="" />
        </Col>
        <Col lg={9}>
          <h1>
            {" "}
            Welcome To Admin Dasboard. You Have The Super Power To Contorl
            Everything
          </h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
