import { AUTH_TYPES } from "../actions/AuthTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isLogged: false,
  isLoading: false,
  loggedOut: true,
  user: null,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TYPES.LOGIN_LOADING:
      state = {
        ...state,
        isLoading: true,
      };
      break;

    case AUTH_TYPES.LOGIN_SUCCESS:
      console.log(action);
      localStorage.setItem("token", action.payload.token);

      state = {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        isLogged: true,
        loggedOut: false,
      };
      break;

    case AUTH_TYPES.USER_LOADED_FROM_TOKEN:
      console.log(action);

      state = {
        ...state,
        isLoading: false,
        user: action.user,
        isLogged: true,
        loggedOut: false,
      };
      break;

    case AUTH_TYPES.LOGGED_OUT:
      console.log(action);

      state = {
        ...state,
        user: null,
        token: null,
        isLogged: false,
        loggedOut: true,
      };
      break;
  
    case AUTH_TYPES.LOGIN_FAILED:
    case AUTH_TYPES.AUTH_ERROR:
      //localStorage.removeItem("token");
      state = {
        ...state,
        user: null,
        isLoading: false,
        loggedOut: true,
      };
      break;

    default:
      break;
  }
  return state;
};
