import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../actions/authActions.js";

const navbar = ({ isAuthenticated, logout }) => {
  const authLinks = () => (
    <Fragment>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/dashboard">
          Dashboard
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/" onClick={logout}>
          Logout
        </NavLink>
      </li>
    </Fragment>
  );

  const guestLinks = () => (
    <Fragment>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/">
          Landing
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/login">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/signup">
          Signup
        </NavLink>
      </li>
    </Fragment>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink className="navbar-brand" exact to="#">
          PERN AUTH
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {isAuthenticated ? authLinks() : guestLinks()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
  isAuthenticated,
});

export default connect(mapStateToProps, { logout })(navbar);
