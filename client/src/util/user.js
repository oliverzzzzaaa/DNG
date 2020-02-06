import axios from "axios";

export const fetchUser = id => {
  return axios.post(`/users/profile/${id}`);
};

export const updateProfile = (id, userInfo) => {
  return axios.post(`/users/update/${id}`, userInfo);
};
