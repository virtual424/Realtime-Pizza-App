import * as authActions from "../actions/auth";
import * as asyncActions from "../actions/async";
import { uiActions } from "../reducers/uiSlice";
import { userActions } from "../reducers/userSlice";

export const signUpRequest =
  ({ api }) =>
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);
    if (action.type === authActions.SIGN_UP_REQUEST) {
      const { name, email, password, type } = action.payload;

      try {
        const userCredential = await api.auth.signUp(email, password);
        if (userCredential) {
          const user = userCredential.user;
          user.displayName = name;
          dispatch(asyncActions.signUpSuccess({ user, type }));
        }
      } catch (error) {
        dispatch(asyncActions.signUpFail(error));
      }
    }
  };

export const signInRequest =
  ({ api }) =>
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);
    if (action.type === authActions.SIGN_IN_REQUEST) {
      const { email, password } = action.payload;
      try {
        const userCredential = await api.auth.signIn(email, password);
        if (userCredential) {
          const user = userCredential.user;
          dispatch(asyncActions.signInSuccess(user));
        }
      } catch (error) {
        dispatch(asyncActions.signInFail(error));
      }
    }
  };

export const signOutRequest =
  ({ api }) =>
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);
    if (action.type === authActions.SIGN_OUT_REQUEST) {
      try {
        await api.auth.signOut();
        dispatch(asyncActions.signOutSuccess(null));
      } catch (error) {
        dispatch(asyncActions.signOutFail(error));
      }
    }
  };

export const getUserRequest =
  ({ api }) =>
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);
    if (action.type === authActions.GET_USER_REQUEST) {
      try {
        const id = action.payload;
        const data = await api.user.getUser(id);
        dispatch(asyncActions.getUserSuccess(data));
      } catch (error) {
        dispatch(asyncActions.getUserFail(error));
      }
    }
  };

export const saveUserRequest =
  ({ api }) =>
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);
    if (action.type === authActions.SAVE_USER_REQUEST) {
      const userObj = action.payload;
      try {
        await api.user.saveUser(userObj);
        dispatch(asyncActions.saveUserSuccess(userObj));
      } catch (error) {
        dispatch(asyncActions.saveUserFail(error));
      }
    }
  };

export const processSignUpResult =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === asyncActions.SIGN_UP_SUCCESS) {
      dispatch(authActions.normalizeUser(action.payload));
    } else if (action.type === asyncActions.SIGN_UP_FAIL) {
      dispatch(uiActions.setError(action.payload));
      dispatch(uiActions.hideLoading());
    }
  };

export const processSignInResult =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    // if (action.type === SIGN_IN_SUCCESS) {
    //   const user = action.payload;
    //   dispatch(getUser(user.uid));
    // } else
    if (action.type === asyncActions.SIGN_IN_FAIL) {
      dispatch(uiActions.setError(action.payload));
      dispatch(uiActions.hideLoading());
    }
  };
export const processSignOutResult =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === asyncActions.SIGN_OUT_SUCCESS) {
      dispatch(userActions.setUser({ user: null }));
      dispatch(uiActions.hideLoading());
    } else if (action.type === asyncActions.SIGN_OUT_FAIL) {
      dispatch(uiActions.setError(action.payload));
      dispatch(uiActions.hideLoading());
    }
  };

export const processGetUserResult =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === asyncActions.GET_USER_SUCCESS) {
      dispatch(userActions.setUser({ user: action.payload }));
      dispatch(uiActions.hideLoading());
    } else if (action.type === asyncActions.GET_USER_FAIL) {
      dispatch(uiActions.setError(action.payload));
      dispatch(uiActions.hideLoading());
    }
  };

export const processSaveUserResult =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === asyncActions.SAVE_USER_SUCCESS) {
      // dispatch(userActions.setUser({ user: action.payload }));
      dispatch(uiActions.hideLoading());
    } else if (action.type === asyncActions.SAVE_USER_FAIL) {
      dispatch(uiActions.setError(action.payload));
      dispatch(uiActions.hideLoading());
    }
  };

export const asyncMdl = [
  signInRequest,
  signUpRequest,
  signOutRequest,
  getUserRequest,
  saveUserRequest,
  processSignInResult,
  processSignUpResult,
  processSignOutResult,
  processSaveUserResult,
  processGetUserResult,
];
