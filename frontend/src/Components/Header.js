import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Primetrade Assignment</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
