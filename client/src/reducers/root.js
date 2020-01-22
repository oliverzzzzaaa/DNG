import { combineReducers } from "redux";
import session from './session_reducer';
import user from './user_reduer';
import errors from './errors_reducer';
import room from './room_reducers'

const RootReducer = combineReducers({
  session,
  user,
  room,
  errors
});

export default RootReducer;
