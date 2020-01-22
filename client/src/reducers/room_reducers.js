import { RECEIVE_NEW_ROOM, RECEIVE_LEAVE_ROOM } from "./../actions/room_actions";

export default function (state={}, action) {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_NEW_ROOM:
            return Object.assign({}, state, {[action.data.data.roomId]: action.data});
        case RECEIVE_LEAVE_ROOM:
            return {};
        default:
            return state;
    }
}