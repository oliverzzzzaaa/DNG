import axios from "axios";

export const createRoom = (userData) => {
    return axios.post('/create', userData);
};

export const joinRoom = (payload) => {
    return axios.post('/join', payload);
};

export const leaveRoom = (userId) => {
    return axios.post('/leave', userId);
};