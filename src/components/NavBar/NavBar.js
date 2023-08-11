import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { navBar, navBrand, nav, searchForm, btnColor, formInput } from "./index";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { navbarBrand, navs } from "../../config/config";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchArticle } from "../../state/action";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchArticle(searchQuery));
    navigate("/search");
    setSearchQuery("");
    setIsCollapsed(true);
  };

  const handleNavClick = () => {
    setIsCollapsed(true);
  };

  const isSearchButtonDisabled = searchQuery.trim() === "";

  return (
    <>
      <Navbar
        ref={navRef}
        style={navBar}
        variant="dark"
        expand="lg"
        fixed="top"
        expanded={!isCollapsed}
      >
        <Navbar.Brand style={navBrand} href="/">
          {navbarBrand}
        </Navbar.Brand>
        <Navbar.Toggle
          className="border-0"
          aria-controls="basic-navbar-nav"
          onClick={() => setIsCollapsed(!isCollapsed)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={nav} className="mr-auto" onClick={handleNavClick}>
            {navs.map((navItem) => (
              <LinkContainer to={navItem.page} key={uuidv4()}>
                <Nav.Link className="ml-2">{navItem.nav}</Nav.Link>
              </LinkContainer>
            ))}
          </Nav>
          <Form style={searchForm} onSubmit={handleSubmit}>
            <FormControl
              type="text"
              placeholder="Explore news..."
              style={formInput}
              className="form-control-lg bg-dark mt-lg-2 mt-md-2 mt-sm-2 mt-xl-0 text-white shadow-sm border-dark"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <Button
              className="btn custom-btn mt-lg-2 ml-2 mt-md-2 mt-sm-2 mt-xl-0 shadow-sm"
              style={btnColor}
              onClick={handleSubmit}
              disabled={isSearchButtonDisabled}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavBar;
