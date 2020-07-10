import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  USER_LOADED,
  AUTH_ERROR,
} from "../actions/actionTypes";
import setTokenHeader from "../utils/setTokenHeader";

const INITIAL_STATE = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      localStorage.setItem("jwt", payload);
      setTokenHeader(payload);
      return { ...state, isAuthenticated: true };
    case USER_LOADED:
      return { ...state, isAuthenticated: true, ...payload };
    case LOGIN_FAILED:
    case SIGNUP_FAILED:
    case AUTH_ERROR:
      localStorage.removeItem("jwt");
      setTokenHeader(null);
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default authReducer;
