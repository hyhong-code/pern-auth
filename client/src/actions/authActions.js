import axios from "axios";

import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT_USER,
} from "../actions/actionTypes";
import setTokenHeader from "../utils/setTokenHeader";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/auth/register", formData, config);
    console.log(res.data);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data.token,
    });
    dispatch(loadMe());
    history.push("/dashboard");
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: SIGNUP_FAILED,
    });
  }
};

export const login = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/auth/login", formData, config);
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token,
    });
    dispatch(loadMe());
    history.push("/dashboard");
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: LOGIN_FAILED,
    });
  }
};

export const loadMe = () => async (dispatch) => {
  setTokenHeader(localStorage.getItem("jwt"));
  try {
    const res = await axios.get("/auth/loadme");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    console.log(res.data);
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  });
};
