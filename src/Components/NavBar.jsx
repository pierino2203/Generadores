import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
      <Container>
        <Nav className="me-auto">
          <Button as={Link} to="/" variant="outline-light">
            Home
          </Button>
        </Nav>
        <Navbar.Brand className="mx-auto">
          Simulacion-4k1-grupo 5
        </Navbar.Brand>
        <Nav className="ms-auto" style={{ width: '70px' }}></Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar; 