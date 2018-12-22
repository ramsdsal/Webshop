import { userConstants } from "../constants";
import { userService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";

export const userActions = {
  login,
  logout,
  remenber,
  refreshfavoritesList
};

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));
    userService.login(username, password).then(
      user => {
        dispatch(success(user));
        userService.favorits(user.id).then(data => {
          dispatch(getFav(data));
        });

        history.push("/");
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

function remenber(user) {
  return dispatch => {
    dispatch(success(user));
    userService.favorits(user.id).then(data => {
      dispatch(getFav(data));
    });
  };
}

function refreshfavoritesList(id) {
  return dispatch => {
    userService.favorits(id).then(data => {
      dispatch(getFav(data));
    });
  };
}

function request(user) {
  return { type: userConstants.LOGIN_REQUEST, user };
}
function success(user) {
  return { type: userConstants.LOGIN_SUCCESS, user };
}
function failure(error) {
  return { type: userConstants.LOGIN_FAILURE, error };
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function getFav(fav) {
  return { type: userConstants.USER_GET_FAVORITS, favorit: fav };
}
