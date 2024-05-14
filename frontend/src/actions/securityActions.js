import axios from "axios";
import setJWTToken from "../securityUtils/setJWTToken";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

export const login = (LoginRequest) => async (dispatch) => {
  try {
    // post -> Login Request
    const res = await axios.post(
      "http://localhost:8080/api/user/login",
      LoginRequest
    );
    // extract token from res.data
    const { token } = res.data;
    console.log(token);
    //console.log(JSON.parse(atob(token.split(".")[1]))["id"]);
    // store the token in localStorage
    sessionStorage.setItem("jwtToken", token);
    // set our token in header
    setJWTToken(token);
    // decode token to React
    // console.log(JSON.parse(atob(token.split(".")[1]))["scope"]);
    // console.log(JSON.parse(atob(token.split(".")[1]))["id"]);
    // dispatch to our securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: token,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const logout = () => (dispatch) => {
  sessionStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
};
