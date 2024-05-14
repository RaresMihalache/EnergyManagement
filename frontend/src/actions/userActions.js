import axios from "axios";
import {
  DELETE_USER,
  GET_USER,
  GET_USERS,
  GET_ERRORS,
  GET_DEVICES,
  SET_CURRENT_USER,
  GET_CONSUMPTION,
  GET_CONSUMPTIONS,
} from "./types";

export const createUser = (user, history) => async (dispatch) => {
  const token = sessionStorage.getItem("jwtToken");
  try {
    await axios.post("http://localhost:8080/api/admin/users", user, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    history.push("http://localhost:8080/dashboard-users");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getUsers = () => async (dispatch) => {
  // const token = localStorage.getItem("token")
  const token = sessionStorage.getItem("jwtToken");
  const res = await axios.get("http://localhost:8080/api/admin/users/all", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  dispatch({
    type: GET_USERS,
    payload: res.data,
  });
};

export const getUser = (id, history) => async (dispatch) => {
  const token = sessionStorage.getItem("jwtToken");
  try {
    const res = await axios.get(`http://localhost:8080/api/admin/users/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  const token = sessionStorage.getItem("jwtToken");
  if (
    window.confirm(
      "Are you sure? This will delete the user and all the data related to it."
    )
  ) {
    await axios.delete(`http://localhost:8080/api/admin/users/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    dispatch({
      type: DELETE_USER,
      payload: id,
    });
  }
};

export const getDevices = (user_id, history) => async (dispatch) => {
  const token = sessionStorage.getItem("jwtToken");
  try {
    const res = await axios.get(
      `http://localhost:8080/api/admin/users/${user_id}/devices`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({
      type: GET_DEVICES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
      // history.push("/dashboard-users");
    });
  }
};

export const getConsumptionsByDeviceAndDate =
  (device_id, date, history) => async (dispatch) => {
    const token = sessionStorage.getItem("jwtToken");
    try {
      const res = await axios.get(
        `http://localhost:8080/api/user/deviceBoard/consumption/${device_id}/${date}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      // history.push("/dashboard-devices");
      dispatch({
        type: GET_CONSUMPTIONS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
        // history.push("/dashboard-users");
      });
    }
  };
