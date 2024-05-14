import axios from "axios";
import { DELETE_DEVICE, GET_DEVICE, GET_DEVICES, GET_ERRORS } from "./types";

export const createDevice = (device, history) => async (dispatch) => {
  const token = sessionStorage.getItem("jwtToken");
  try {
    await axios.post("http://localhost:8080/api/admin/devices", device, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    history.push("/dashboard-devices");
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

export const getDevices = () => async (dispatch) => {
  const token = sessionStorage.getItem("jwtToken");
  const res = await axios.get("http://localhost:8080/api/admin/devices/all", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  dispatch({
    type: GET_DEVICES,
    payload: res.data,
  });
};

export const getDevicesUsers = () => async (dispatch) => {
  const token = sessionStorage.getItem("jwtToken");
  const user_id = JSON.parse(atob(token.split(".")[1]))["id"];
  console.log(user_id);
  const res = await axios.get(
    `http://localhost:8080/api/user/${user_id}/devices/all`,
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
};

export const getDevice = (id, history) => async (dispatch) => {
  const token = sessionStorage.getItem("jwtToken");
  try {
    const res = await axios.get(
      `http://localhost:8080/api/admin/devices/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({
      type: GET_DEVICE,
      payload: res.data,
    });
  } catch (error) {
    history.push("/dashboard-devices");
  }
};

export const getDeviceUser = (deviceId, history) => async (dispatch) => {
  const token = sessionStorage.getItem("jwtToken");
  try {
    const res = await axios.get(
      `http://localhost:8080/api/user/devices/${deviceId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({
      type: GET_DEVICE,
      payload: res.data,
    });
  } catch (error) {
    // history.push("/home-user");
  }
};

export const deleteDevice = (id) => async (dispatch) => {
  const token = sessionStorage.getItem("jwtToken");
  if (
    window.confirm(
      "Are you sure? This will delete the device and all the data related to it."
    )
  ) {
    await axios.delete(`http://localhost:8080/api/admin/devices/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    dispatch({
      type: DELETE_DEVICE,
      payload: id,
    });
  }
};
