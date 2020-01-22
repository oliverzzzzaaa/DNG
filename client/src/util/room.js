import axios from "axios";

export const createRoom = (userData) => {
    return axios.post('/rooms/create', userData);
};

export const joinRoom = (payload) => {
    return axios.post('/rooms/join', payload);
};

export const leaveRoom = (userId) => {
    return axios.post('/rooms/leave', userId);
};