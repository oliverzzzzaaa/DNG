import { combineReducers } from "redux";
import session from './session_reducer';
import users from './user_reducer';
import errors from './errors_reducer';
import rooms from './room_reducers'

const RootReducer = combineReducers({
  session,
  users,
  rooms,
  errors
});

export default RootReducer;
