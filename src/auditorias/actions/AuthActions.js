import { AUTH_TYPES } from "./AuthTypes";
import api from "../http/api";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: AUTH_TYPES.LOGIN_LOADING });
  api.get("/login/load-user").then(
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

export const attempLogin = (datos) => (dispatch, getState) => {
  dispatch({ type: AUTH_TYPES.LOGIN_LOADING });
  api.post("/login/login", datos).then(
    (response) => {
      if (response.data.user) {
        dispatch({ type: AUTH_TYPES.LOGIN_SUCCESS, payload: response.data });
      }
    },
    (err) => {
      dispatch({ type: AUTH_TYPES.AUTH_ERROR });
    }
  );
};
