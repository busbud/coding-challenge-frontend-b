import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const CustomNavbar = () => (
  <Navbar fixed="top" collapseOnSelect expand="md" bg="dark" variant="dark">
    <Navbar.Brand>Osheaga Planner</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end text-white">
      <Nav />
    </Navbar.Collapse>
  </Navbar>
);
export default CustomNavbar;
