import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import deviceReducer from "./deviceReducer";
import backlogReducer from "./backlogReducer";
import userReducer from "./userReducer";
import securityReducer from "./securityReducer";

export default combineReducers({
  errors: errorReducer,
  device: deviceReducer,
  backlog: backlogReducer,
  user: userReducer,
  security: securityReducer,
});
