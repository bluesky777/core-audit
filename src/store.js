import { createStore, combineReducers, applyMiddleware } from "redux";
import { AuthReducer } from "./auditorias/reducers";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  sidebarShow: false,
  auditoriasIglesia: [],
  auditoriaActual: {},
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const middleware = [ReduxThunk];

const reducers = combineReducers({
  AuthReducer,
  changeState,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
