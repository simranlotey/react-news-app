import React from "react";
import { Link } from "react-router-dom";
import { navbarBrand, navs } from '../../config/config';
import "../../components/navbar/navbar.css"

function NavBar() {
  return (
    <div>
      <nav className={`navbar py-3 fixed-top navbar-expand-lg navbar-dark shadow`}>
        <Link className="navbar-brand ml-4" to="/">
          {navbarBrand}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {navs.map(navs =>
              <li className="nav-item">
                <Link className="nav-link" to={navs.page}>
                  {navs.nav}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
