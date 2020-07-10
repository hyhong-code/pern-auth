import axios from "axios";
import { toast } from "react-toastify";

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
    toast.success("Signup success!", { autoClose: 3000 });
    history.push("/dashboard");
  } catch (error) {
    console.log(error.response);
    toast.error(error.response.data.error, { autoClose: 5000 });
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
    toast.success("Login success!", { autoClose: 3000 });
    dispatch(loadMe());
  } catch (error) {
    console.log(error.response);
    toast.error(error.response.data.error, { autoClose: 5000 });
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
