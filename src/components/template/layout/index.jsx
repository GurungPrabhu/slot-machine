import React from "react";
import PropTypes from "prop-types";
import AuthenticationComponent from "../../modules/authentication-btn/index";

const Layout = ({ children }) => (
  <div className="container-fluid">
    <nav className="navbar navbar-light bg-light p-3">
      <img
        src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
        style={{ height: "30px", width: "80px" }}
        alt="logo"
      />
      <AuthenticationComponent />
    </nav>
    {children}
    <nav className="bg-light p-3 footer">
      <p className="text-center">Copyright® 2021</p>
    </nav>
  </div>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
