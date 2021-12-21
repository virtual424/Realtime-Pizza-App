export const SIGN_IN = "[auth] SIGNIN";
export const SIGN_UP = "[auth] SIGNUP";
export const SIGN_OUT = "[auth] SIGNOUT";
export const GET_USER = "[auth] GETUSER";
export const SAVE_USER = "[auth] SAVEUSER";
export const SIGN_IN_REQUEST = "[auth] SIGN_IN_REQUEST";
export const SIGN_UP_REQUEST = "[auth] SIGN_UP_REQUEST";
export const SIGN_OUT_REQUEST = "[auth] SIGN_OUT_REQUEST";
export const NORMALIZE_USER = "[auth] NORMALIZE_USER";
export const GET_USER_REQUEST = "[auth] GET_USER_REQUEST";
export const SAVE_USER_REQUEST = "[auth] SAVE_USER_REQUEST";

export const signIn = (data) => ({
  type: SIGN_IN,
  payload: data,
});

export const signUp = (data) => ({
  type: SIGN_UP,
  payload: data,
});

export const signOut = (data) => ({
  type: SIGN_OUT,
  payload: data,
});

export const getUser = (data) => ({
  type: GET_USER,
  payload: data,
});

export const saveUser = (data) => ({
  type: SAVE_USER,
  payload: data,
});

export const signInRequest = (data) => ({
  type: SIGN_IN_REQUEST,
  payload: data,
});

export const signUpRequest = (data) => ({
  type: SIGN_UP_REQUEST,
  payload: data,
});

export const signOutRequest = (data) => ({
  type: SIGN_OUT_REQUEST,
  payload: data,
});

export const normalizeUser = (data) => ({
  type: NORMALIZE_USER,
  payload: data,
});

export const getUserRequest = (id) => ({
  type: GET_USER_REQUEST,
  payload: id,
});

export const saveUserRequest = (data) => ({
  type: SAVE_USER_REQUEST,
  payload: data,
});
