import axios from "axios";
import { GET_USER, GET_DEVICE, GET_ERRORS } from "./types";

export const createMapping =
  (userId, deviceId, history) => async (dispatch) => {
    const token = sessionStorage.getItem("jwtToken");
    try {
      console.log(token);
      console.log("aici ajunge");
      const res = await axios.post(
        `http://localhost:8080/api/admin/mappings/${userId}/${deviceId}`,
        [userId, deviceId],
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("aici nu ajunge");
      // history.push("/dashboard-devices");
      dispatch({
        type: GET_ERRORS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };
