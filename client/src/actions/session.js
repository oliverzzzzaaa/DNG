import * as APIUtil from "../util/session";

export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";

export const logout = () => {
  localStorage.removeItem("jwtToken");
  APIUtil.setAuthToken(false);
};
