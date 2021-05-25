/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { error, success } from "../../../utils/toast";
import { login, logout, signUp } from "../../../redux/action/auth";

const Button = ({ text, onClick }) => (
  <button className="btn btn-primary m-2" type="button" onClick={onClick}>
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
const InputComponent = ({ onSubmit, btnName, onCancel }) => {
  const [username, setUsername] = useState("");

  const onClickSubmit = () => {
    if (username.length > 0) {
      onSubmit(username);
    }
  };

  const onChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="form-group m-2">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        onChange={onChange}
        className="form-control"
        id="username"
        aria-describedby="emailHelp"
        placeholder="Enter username"
      />
      <button
        className="btn btn-primary m-2"
        type="submit"
        onClick={onClickSubmit}
      >
        {btnName || "Done"}
      </button>
      <button className="btn btn-danger m-2" type="submit" onClick={onCancel}>
        Back
      </button>
    </div>
  );
};

InputComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  btnName: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
};

InputComponent.defaultProps = {
  btnName: "",
};

const AuthenticationComponent = () => {
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [loginMode, setLoginMode] = useState(false);
  const [signUpMode, setSignUpMode] = useState(false);

  const validateRegistration = (string) => {
    if (!auth.database.includes(string)) return true;
    return false;
  };

  const validateLogin = (string) => {
    if (auth.database.includes(string)) return true;
    return false;
  };

  const onSubmitLogin = (username) => {
    if (validateLogin(username)) {
      dispatch(login(username));
      success("Login successfull!");
      setLoginMode(false);
    } else error("Login Error");
  };

  const onSubmitSignUp = (value) => {
    if (validateRegistration(value)) {
      dispatch(signUp(value));
      success("Sign up successfull");
      setSignUpMode(false);
    } else {
      error("Error");
    }
  };

  const onClickLogout = () => {
    // eslint-disable-next-line no-alert
    const answer = window.confirm("Do you want to logout?");
    if (answer) {
      dispatch(logout());
    }
  };

  const onClickSignup = () => {
    setLoginMode(false);
    setSignUpMode((prevState) => !prevState);
  };

  const onClickLogin = () => {
    setLoginMode((prevState) => !prevState);
    setSignUpMode(false);
  };

  const onCancelLogin = () => {
    setLoginMode(false);
  };

  const onCancelSignUp = () => {
    setSignUpMode(false);
  };
  return (
    <>
      <div>
        {auth.loggedIn && <span>{auth.username}</span>}

        {/* Toggle buttons mode  */}
        {!auth.loggedIn && !signUpMode && !loginMode && (
          <Button text="Login" onClick={onClickLogin} />
        )}
        {auth.loggedIn && <Button text="Logout" onClick={onClickLogout} />}
        {!auth.loggedIn && !signUpMode && !loginMode && (
          <Button text="Sign up" onClick={onClickSignup} />
        )}

        {/* Show input mode */}
        {signUpMode && (
          <InputComponent
            onSubmit={onSubmitSignUp}
            btnName="Sign up"
            onCancel={onCancelSignUp}
          />
        )}
        {loginMode && (
          <InputComponent
            onSubmit={onSubmitLogin}
            btnName="Log-in"
            onCancel={onCancelLogin}
          />
        )}
      </div>
    </>
  );
};

export default AuthenticationComponent;
