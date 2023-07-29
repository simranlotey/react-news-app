import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  navBar,
  navBrand,
  nav,
  searchForm,
  btnColor,
  formInput,
} from "./index";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { navbarBrand, navs } from "../../config/config";
import { LinkContainer } from "react-router-bootstrap";
import { endpointSearch } from "../../config/api";
import { useNavigate } from "react-router-dom";
import News from "../News/News";
import axios from "axios";

function NavBar(props) {
  const navigate = useNavigate();
  const navRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchSearch, setSearchSearch] = useState("");
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = async () => {
    try {
      props.setProgress(15);
      setIsCollapsed(true);
      setLoading(true);
      const response = await axios.get(endpointSearch(searchQuery));
      props.setProgress(70);
      setSearchSearch(searchQuery);
      const result = response.data;
      setArticles(result);
      setSearchQuery("");
      setShowSearchResults(true);
      setLoading(false);
      navigate("/search");
      props.setProgress(100);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsCollapsed(true);
    handleSearch();
  };

  const handleNavClick = () => {
    setIsCollapsed(true);
    setShowSearchResults(false);
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
              onClick={handleSearch}
              disabled={isSearchButtonDisabled}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      {showSearchResults ? (
        <News news={articles} searchQuery={searchSearch} loading={loading} />
      ) : null}
    </>
  );
}

export default NavBar;
