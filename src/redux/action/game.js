/* eslint-disable object-curly-newline */
import * as type from "../constant";

const logCurrentUser = ({ slots, date, username }) => ({
  type: type.LOGGEDBYCURRENTUSER,
  payload: {
    slots,
    date,
    username,
  },
});

const loggedIn = (username) => ({ type: type.USERLOGGEDIN, payload: username });

const loggedOut = () => ({ type: type.USERLOGGEDOUT });

const changeBalance = (balance) => ({
  type: type.CHANGEBALANCE,
  payload: balance,
});

export { logCurrentUser, loggedIn, loggedOut, changeBalance };
