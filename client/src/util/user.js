
import axios from 'axios';

export const fetchUser = (id) => {
    return axios.get(`/api/users/${id}`);
};

export const updateProfile = (id, userInfo) => {
    let { username, image } = userInfo;
    return axios.patch(`/api/users/${id}`, { username, image });
}