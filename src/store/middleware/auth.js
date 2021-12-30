import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  GET_USER,
  SAVE_USER,
  signInRequest,
  signOutRequest,
  signUpRequest,
  saveUserRequest,
  getUserRequest,
} from "../actions/auth";
import { uiActions } from "../reducers/uiSlice";

export const signInFlow =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === SIGN_IN) {
      dispatch(signInRequest(action.payload));
      dispatch(uiActions.showLoading());
    }
  };

export const signUpFlow =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === SIGN_UP) {
      dispatch(signUpRequest(action.payload));
      dispatch(uiActions.showLoading());
    }
  };

export const signOutFlow =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === SIGN_OUT) {
      dispatch(signOutRequest());
      dispatch(uiActions.showLoading());
    }
  };

export const getUserFlow =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_USER) {
      dispatch(getUserRequest(action.payload));
      dispatch(uiActions.showLoading());
    }
  };

export const saveUserFlow =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === SAVE_USER) {
      dispatch(saveUserRequest(action.payload));
      dispatch(uiActions.showLoading());
    }
  };

export const authMdl = [
  signInFlow,
  signUpFlow,
  signOutFlow,
  saveUserFlow,
  getUserFlow,
];
