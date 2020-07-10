import axios from "axios";

import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  USER_LOADED,
  AUTH_ERROR,
} from "../actions/actionTypes";
import setTokenHeader from "./actionTypes";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const signup = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/auth/register", formData, config);
    console.log(res.data);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data.token,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: SIGNUP_FAILED,
    });
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/auth/login", formData, config);
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: LOGIN_FAILED,
    });
  }
};
