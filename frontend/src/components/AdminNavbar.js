import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
const AdminNavbar = (props) => {
  return (
    <ListGroup as="ul">
      <ListGroup.Item
        as="li"
        active={props.active == "userlist" ? true : false}
      >
        <Link
          style={{ color: `${props.active == "userlist" ? "white" : "black"}` }}
          to="/adminuserlist"
        >
          User List
        </Link>
      </ListGroup.Item>
      <ListGroup.Item as="li">Product List</ListGroup.Item>
      <ListGroup.Item as="li">Product upload</ListGroup.Item>
      <ListGroup.Item as="li">Category Upload</ListGroup.Item>
      <ListGroup.Item as="li">Brad Upload</ListGroup.Item>
      <ListGroup.Item as="li">Blog</ListGroup.Item>
      <ListGroup.Item as="li">Product Approve</ListGroup.Item>
      <ListGroup.Item
        as="li"
        active={props.active == "rolemanage" ? true : false}
      >
        <Link
          style={{
            color: `${props.active == "rolemanage" ? "white" : "black"}`,
          }}
          to="/rolemanagement"
        >
          Role Assign
        </Link>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default AdminNavbar;
