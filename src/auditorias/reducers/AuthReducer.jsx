import { AUTH_TYPES } from "../actions/AuthTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isLogged: false,
  isLoading: false,
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
      };
      break;

    case AUTH_TYPES.LOGIN_FAILED:
    case AUTH_TYPES.AUTH_ERROR:
      localStorage.removeItem("token");
      state = {
        ...state,
        user: null,
        isLoading: false,
      };
      break;

    default:
      break;
  }
  return state;
};
