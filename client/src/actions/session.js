import * as APIUtil from "../util/session";
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGN_IN
});

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

// export const receiveConnectionErrors = connectionErrors => ({
//   type: RECEIVE_CONNECTION_ERRORS,
//   connectionErrors
// });

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});


export const logout = () => {
  localStorage.removeItem("jwtToken");
  APIUtil.setAuthToken(false);
};

export const signup = user => dispatch => (
  APIUtil.signup(user).then(() => (
    dispatch(receiveUserSignIn())
  ), err => (
    dispatch(receiveErrors(err.response.data))
  ))
);

export const login = user => dispatch => (
  APIUtil.login(user).then(res => {
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    APIUtil.setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(receiveCurrentUser(decoded))
  })
    .catch(err => {
      dispatch(receiveErrors(err.response.data));
    })
)

// export const connectUser = (userId, connectionCode) => dispatch => (
//   APIUtil.connectUser(userId, connectionCode)
//     .then(user => (dispatch(receiveCurrentUser(user.data))))
//     .catch(err => {
//       dispatch(receiveConnectionErrors(err.response.data));
//     })
// );