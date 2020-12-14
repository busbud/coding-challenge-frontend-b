import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

function Navigation() {
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">Busbud</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default Navigation;
