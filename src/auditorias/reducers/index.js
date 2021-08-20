import { combineReducers } from "redux";
import { AuthReducer } from "./AuthReducer";
import { PageReducer } from "./PageReducer";

export const reducers = combineReducers({
    AuthReducer,
    PageReducer
});

// export { AuthReducer, PageReducer };
