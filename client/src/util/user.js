
import axios from 'axios';

export const fetchUser = (id) => {
    return axios.post(`/users/${id}`);
};

export const updateProfile = (id, userInfo) => {
    let { username, image } = userInfo;
    return axios.patch(`/users/${id}`, { username, image });
}