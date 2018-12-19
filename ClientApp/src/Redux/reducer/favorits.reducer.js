import { userConstants } from "../constants";

export function favorits(state = [], action) {
  switch (action.type) {
    case userConstants.USER_GET_FAVORITS:
      return action.favorit;
    default:
      return state;
  }
}
