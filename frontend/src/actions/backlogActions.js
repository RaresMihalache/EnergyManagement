import axios from "axios";
import {
  GET_ERRORS,
  GET_BACKLOG,
  GET_CONSUMPTION,
  DELETE_CONSUMPTION,
} from "./types";

export const addConsumption =
  (backlog_id, consumption, history) => async (dispatch) => {
    try {
      const token = sessionStorage.getItem("jwtToken");
      await axios.post(
        `http://localhost:8080/api/admin/backlog/${backlog_id}`,
        consumption,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      history.push(`/deviceBoard/${backlog_id}`);
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

export const getBacklog = (backlog_id) => async (dispatch) => {
  try {
    const token = sessionStorage.getItem("jwtToken");
    const res = await axios.get(
      `http://localhost:8080/api/admin/backlog/${backlog_id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({
      type: GET_BACKLOG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const deleteConsumption =
  (backlog_id, consumption_id) => async (dispatch) => {
    const token = sessionStorage.getItem("jwtToken");
    if (
      window.confirm(
        `You are deleting project task ${consumption_id}, this action cannot be undone`
      )
    ) {
      const res = await axios.delete(
        `http://localhost:8080/api/admin/backlog/${backlog_id}/${consumption_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch({
        type: DELETE_CONSUMPTION,
        payload: consumption_id,
      });
    }
  };
