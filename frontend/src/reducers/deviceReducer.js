import {
  GET_DEVICES,
  GET_DEVICE,
  DELETE_DEVICE,
  GET_CONSUMPTIONS,
} from "../actions/types";

const initialState = {
  devices: [],
  device: {},
  consumptions: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DEVICES:
      return {
        ...state,
        devices: action.payload,
      };

    case GET_DEVICE:
      return {
        ...state,
        device: action.payload,
      };

    case DELETE_DEVICE:
      return {
        ...state,
        devices: state.devices.filter((device) => device.id !== action.payload),
      };

    case GET_CONSUMPTIONS:
      return {
        ...state,
        consumptions: action.payload,
      };
    default:
      return state;
  }
}
