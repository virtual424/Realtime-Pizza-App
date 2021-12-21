export const SIGN_IN_SUCCESS = "[async] signInSuccess";
export const SIGN_IN_FAIL = "[async] signInFail";
export const SIGN_UP_SUCCESS = "[async] signUpSuccess";
export const SIGN_UP_FAIL = "[async] signUpFail";
export const SIGN_OUT_SUCCESS = "[async] signOutSuccess";
export const SIGN_OUT_FAIL = "[async] signOutFail";
export const GET_USER_SUCCESS = "[async] getUserSuccess";
export const GET_USER_FAIL = "[async] getUserFail";
export const SAVE_USER_SUCCESS = "[async] saveUserSuccess";
export const SAVE_USER_FAIL = "[async] saveUserFail";

export const signInSuccess = (data) => ({
  type: SIGN_IN_SUCCESS,
  payload: data,
});

export const signInFail = (error) => ({
  type: SIGN_IN_FAIL,
  payload: error,
});

export const signUpSuccess = (data) => ({
  type: SIGN_UP_SUCCESS,
  payload: data,
});

export const signUpFail = (error) => ({
  type: SIGN_UP_FAIL,
  payload: error,
});

export const signOutSuccess = (data) => ({
  type: SIGN_OUT_SUCCESS,
  payload: data,
});

export const signOutFail = (error) => ({
  type: SIGN_OUT_FAIL,
  payload: error,
});

export const getUserSuccess = (data) => ({
  type: GET_USER_SUCCESS,
  payload: data,
});

export const getUserFail = (error) => ({
  type: GET_USER_FAIL,
  payload: error,
});

export const saveUserSuccess = (data) => ({
  type: SAVE_USER_SUCCESS,
  payload: data,
});

export const saveUserFail = (error) => ({
  type: SAVE_USER_FAIL,
  payload: error,
});
