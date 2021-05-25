import * as type from "../constant";

const INITIALSTATE = {
  username: "",
  loggedIn: false,
  database: [],
};

const authReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case type.LOGIN: {
      return { ...state, username: action.payload, loggedIn: true };
    }
    case type.LOGOUT: {
      return { ...state, username: "", loggedIn: false };
    }
    case type.SIGNUP: {
      return {
        ...state,
        username: action.payload,
        database: [...state.database, action.payload],
      };
    }
    default:
      return state;
  }
};

export default authReducer;
