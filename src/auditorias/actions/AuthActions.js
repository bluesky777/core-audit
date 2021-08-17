import { AUTH_TYPES } from "./AuthTypes";
import axios from "axios";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: AUTH_TYPES.LOGIN_LOADING });
  axios.get("/api/login/load-user").then(
    (response) => {
      if (response.data.user) {
        dispatch({ type: AUTH_TYPES.LOGIN_LOADED, user: response.data.user });
      }
    },
    (err) => {
      dispatch({ type: AUTH_TYPES.AUTH_ERROR });
    }
  );
};
