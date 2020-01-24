import {
  RECEIVE_ALL_ROOMS,
  RECEIVE_NEW_ROOM,
  RECEIVE_LEAVE_ROOM,
  RECEIVE_REMOVE_ROOM
} from "./../actions/room_actions";

export default function(state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_ROOMS:
      return Object.assign({}, action.rooms);
    case RECEIVE_NEW_ROOM:
      return Object.assign({}, state, { [action.data.id]: action.data });
    case RECEIVE_REMOVE_ROOM:
      const nextState = Object.assign({}, state);
      delete nextState[action.id];
      return nextState;
    default:
      return state;
  }
}
