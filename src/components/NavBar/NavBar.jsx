import React from "react";
import { Navbar, Container } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar className="bg-primary py-3 shadow-sm">
      <Container fluid="lg" className="d-flex justify-content-between">
        <Navbar.Brand href="#" className="text-light fs-2 fw-bold">
          Todo App
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
