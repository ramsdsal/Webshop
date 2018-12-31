import { combineReducers } from "redux";
import { authentication } from "./authentication.reducer";
import { cart } from "./cart.reducer";
import { favorits } from "./favorits.reducer";
import { alert } from "./alert.reducer";

const rootReducer = combineReducers({
  authentication,
  alert,
  cart,
  favorits
});

export default rootReducer;
