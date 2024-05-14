import {
  GET_USERS,
  GET_USER,
  DELETE_USER,
  GET_DEVICES,
  GET_DEVICE,
} from "../actions/types";

const initialState = {
  users: [],
  devices: [],
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };

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

    default:
      return state;
  }
}
