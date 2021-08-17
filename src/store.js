import { createStore, combineReducers } from "redux";
import { AuthReducer } from "./auditorias/reducers";

const initialState = {
  sidebarShow: "responsive",
  auditoriasIglesia: [],
  auditoriaActual: {},
  db: {},
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const reducers = combineReducers({
  AuthReducer,
  changeState,
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
