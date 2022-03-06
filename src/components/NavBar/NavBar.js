import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { navbarBrand, navs } from '../../config/config'
import { LinkContainer } from 'react-router-bootstrap'


const navBar = {
  backgroundColor: 'rgb(41, 47, 51)',
  padding: "20px",
  fontSize: "18px",
};

const navBrand = {
  fontSize: "27px",
  marginLeft: "20px"
};

const nav = {
  marginLeft: "14px"
}

function NavBar() {
  return (
    <Navbar style={navBar} variant="dark" expand="lg" fixed="top">
      <Navbar.Brand style={navBrand} href="/">{navbarBrand}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={nav} className="mr-auto">
          {navs.map(navs =>
            <LinkContainer to={navs.page}>
              <Nav.Link className="ml-2">{navs.nav}</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default NavBar;