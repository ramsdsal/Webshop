import { combineReducers } from "redux";
import { authentication } from "./authentication.reducer";
import { cart } from "./cart.reducer";
import { alert } from "./alert.reducer";

const rootReducer = combineReducers({
  authentication,
  alert,
  cart
});

export default rootReducer;
