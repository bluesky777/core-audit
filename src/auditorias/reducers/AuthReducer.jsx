import { AUTH_TYPES } from "src/auditorias/actions/AuthTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isLogged: false,
  isLoading: false,
  user: null,
};

export const AuthReducer = (state = initialState, action) => {
  console.log({ state });

  switch (action.type) {
    case AUTH_TYPES.LOGIN_LOADING:
      state = {
        ...state,
        isLoading: true,
      };
      break;

    case AUTH_TYPES.LOGIN_LOADED:
      state = {
        ...state,
        isLoading: false,
      };
      break;

    case AUTH_TYPES.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.user,
      };
      break;

    case AUTH_TYPES.LOGIN_FAILED:
      localStorage.removeItem("token");
      state = {
        ...state,
        user: null,
      };
      break;

    default:
      break;
  }
  return state;
};
