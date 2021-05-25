import React from "react";
import PropTypes from "prop-types";

const Layout = ({ children }) => <div>{children}</div>;
export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
