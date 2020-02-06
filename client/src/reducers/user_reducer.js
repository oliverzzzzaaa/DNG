import { RECEIVE_USER } from "../actions/user_actions";

export default function(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return Object.assign({}, { [action.user.id]: action.user });
    default:
      return state;
  }
}
