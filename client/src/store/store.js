import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "../reducers/root";

const configureStore = (preloadedState = {}) =>
  createStore(rootReducer, preloadedState, applyMiddleware(logger));

export default configureStore;
