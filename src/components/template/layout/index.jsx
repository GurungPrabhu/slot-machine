import React from "react";
import PropTypes from "prop-types";
import AuthenticationComponent from "../../modules/authentication-btn/index";

const Layout = ({ children }) => (
  <div className="container-fluid">
    <nav className="navbar navbar-light bg-light p-3">
      <span className="navbar-brand mb-0 h1">Navbar</span>
      <AuthenticationComponent />
    </nav>
    {children}
    <nav className="bg-light p-3 footer">
      <p className="text-center">Copyright</p>
    </nav>
  </div>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
