import React from "react";
import PropTypes from "prop-types";

const Button = ({ text, onClick, className }) => (
  <button className={className} type="button" onClick={onClick}>
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: "btn btn-primary m-2",
};

export default Button;
