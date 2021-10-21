import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { reducers } from "./auditorias/reducers";

const middleware = [ReduxThunk];

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
