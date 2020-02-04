import { RECEIVE_USER } from '../actions/user_actions';

export default function (state = {}, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return Object.assign({}, state, { [action.user.data.id]: action.user.data });
        default:
            return state;
    }
};