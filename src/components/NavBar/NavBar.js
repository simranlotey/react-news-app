import React from "react"
import { v4 as uuidv4 } from "uuid";
import { navBar, navBrand, nav } from "./index";
import { Navbar, Nav } from "react-bootstrap"
import { navbarBrand, navs } from "../../config/config"
import { LinkContainer } from "react-router-bootstrap"


function NavBar() {
  return (
    <Navbar style={navBar} variant="dark" expand="lg" fixed="top">
      <Navbar.Brand style={navBrand} href="/">{navbarBrand}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={nav} className="mr-auto">
          {navs.map(navs =>
            <LinkContainer to={navs.page} key={uuidv4()}>
              <Nav.Link className="ml-2">{navs.nav}</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default NavBar;