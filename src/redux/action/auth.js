import * as type from "../constant";

const login = (username) => ({ type: type.LOGIN, payload: username });

const logout = () => ({ type: type.LOGOUT });

const signUp = (username) => ({ type: type.SIGNUP, payload: username });

export { login, logout, signUp };
