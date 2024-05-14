import {
  GET_BACKLOG,
  GET_CONSUMPTION,
  GET_CONSUMPTIONS,
  DELETE_CONSUMPTION,
} from "../actions/types";

const initialState = {
  consumptions: [],
  consumption: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BACKLOG:
      return {
        ...state,
        consumptions: action.payload,
      };

    case GET_CONSUMPTION:
      return {
        ...state,
        consumption: action.payload,
      };

    case GET_CONSUMPTIONS:
      return {
        ...state,
        consumptions: action.payload,
      };

    case DELETE_CONSUMPTION:
      return {
        ...state,
        consumptions: state.backlog.consumptions.filter(
          (consumption) => consumption.id != action.payload
        ),
      };

    default:
      return state;
  }
}
