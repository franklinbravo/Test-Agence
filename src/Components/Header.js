import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import logo from '../assets/logo.gif'
export const Header = () => {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Navbar.Brand href="#home"><img src={logo} alt="" /></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#Agence">Agence</Nav.Link>
          <Nav.Link href="#Projetos">Projetos</Nav.Link>
          <Nav.Link href="#Administrativo">Administrativo</Nav.Link>
          <Nav.Link href="#Comercial">Comercial</Nav.Link>
          <Nav.Link href="#Financiero">Financiero</Nav.Link>
          <Nav.Link href="#Usuario">Usuario</Nav.Link>
          <Nav.Link href="#Salir">Salir</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
