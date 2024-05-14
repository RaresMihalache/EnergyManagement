import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  validToken: false,
  token: "",
};

const booleanActionPayload = (payload) => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: booleanActionPayload(action.payload),
        token: action.payload,
      };

    default:
      return state;
  }
}
