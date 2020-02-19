import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "../reducers/root";
import thunk from "redux-thunk";

const middlewares = [thunk];
if (process.env.NODE_ENV !== "production") {
  middlewares.push(logger);
}

const configureStore = (preloadedState = {}) =>
  createStore(rootReducer, preloadedState, applyMiddleware(...middlewares));

export default configureStore;
