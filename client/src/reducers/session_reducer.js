import { RECEIVE_CURRENT_USER, RECEIVE_USER_LOGOUT, RECEIVE_USER_SIGN_IN, RECEIVE_NEW_NAME } from '../actions/session_actions';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function (state = initialState, action) {
    const nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            nextState.isAuthenticated = !!action.currentUser;
            nextState.user = action.currentUser;
            return nextState;
        case RECEIVE_USER_SIGN_IN:
            nextState.isAuthenticated = !!action.currentUser;
            nextState.user = action.currentUser;
            return nextState;
        case RECEIVE_USER_LOGOUT:
            return {
                isAuthenticated: false,
                user: undefined
            };
        case RECEIVE_NEW_NAME:
            nextState.user.name = action.name;
            return nextState;
        default:
            return state;
    }
}