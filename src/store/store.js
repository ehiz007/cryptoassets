import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import Reducer, { initialState } from "./reducer";
// thunk for dispatching asynchronous actions
// composeWithdevtools for showing redux store in chrome extensions

const store = createStore(
  Reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
