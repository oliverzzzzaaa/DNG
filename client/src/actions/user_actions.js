import * as APIUtil from '../util/user';
import jwt_decode from 'jwt-decode';
import { receiveCurrentUser } from './session_actions';
import { setAuthToken } from '../util/session';

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_UPDATED_CURRENT_USER = "RECEIVE_UPDATED_CURRENT_USER";

export const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

export const receiveUpdatedCurrentUser = user => ({
    type: RECEIVE_UPDATED_CURRENT_USER,
    user
});

export const fetchUser = id => dispatch => (
    APIUtil.fetchUser(id)
        .then(user => (dispatch(receiveUser(user))))
);

export const fetchUpdatedCurrentUser = (id) => dispatch => (
    APIUtil.fetchUser(id)
        .then(user => dispatch(receiveCurrentUser(user.data)))
);

export const updateProfile = (id, userInfo) => dispatch => (
    APIUtil.updateProfile(id, userInfo)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(receiveCurrentUser(decoded));
        })
);