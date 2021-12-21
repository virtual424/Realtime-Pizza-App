import {
  SIGN_IN_REQUEST,
  SIGN_OUT_REQUEST,
  SIGN_UP_REQUEST,
  GET_USER_REQUEST,
  SAVE_USER_REQUEST,
  normalizeUser,
  getUser,
} from "../actions/auth";
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAIL,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  SAVE_USER_SUCCESS,
  SAVE_USER_FAIL,
  signInSuccess,
  signInFail,
  signUpSuccess,
  signUpFail,
  signOutSuccess,
  signOutFail,
  getUserSuccess,
  getUserFail,
  saveUserSuccess,
  saveUserFail,
} from "../actions/async";
import { uiActions } from "../reducers/uiSlice";
import { userActions } from "../reducers/userSlice";
import { auth, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  setDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";

export const signUpRequest =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);
    if (action.type === SIGN_UP_REQUEST) {
      const { name, email, password, type } = action.payload;

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (userCredential) {
          const user = userCredential.user;
          user.displayName = name;
          dispatch(signUpSuccess({ user, type }));
        }
      } catch (error) {
        dispatch(signUpFail(error));
      }
    }
  };

export const signInRequest =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);
    if (action.type === SIGN_IN_REQUEST) {
      const { email, password } = action.payload;
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        if (userCredential) {
          const user = userCredential.user;
          dispatch(signInSuccess(user));
        }
      } catch (error) {
        dispatch(signInFail(error));
      }
    }
  };

export const signOutRequest =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);
    if (action.type === SIGN_OUT_REQUEST) {
      try {
        await signOut(auth);
        dispatch(signOutSuccess(null));
      } catch (error) {
        dispatch(signOutFail(error));
      }
    }
  };

export const getUserRequest =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);
    if (action.type === GET_USER_REQUEST) {
      try {
        const id = action.payload;
        const q = query(collection(db, "users"), where("uid", "==", id));
        const querySnapshot = await getDocs(q);
        let data = null;
        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
            data = doc.data();
          });
        }
        dispatch(getUserSuccess(data));
      } catch (error) {
        dispatch(getUserFail(error));
      }
    }
  };

export const saveUserRequest =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);
    if (action.type === SAVE_USER_REQUEST) {
      const userObj = action.payload;
      try {
        await setDoc(doc(db, "users", userObj.uid), userObj);
        dispatch(saveUserSuccess(userObj));
      } catch (error) {
        dispatch(saveUserFail(error));
      }
    }
  };

export const processSignUpResult =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === SIGN_UP_SUCCESS) {
      dispatch(normalizeUser(action.payload));
    } else if (action.type === SIGN_UP_FAIL) {
      dispatch(uiActions.setError(action.payload));
      dispatch(uiActions.hideLoading());
    }
  };

export const processSignInResult =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    // if (action.type === SIGN_IN_SUCCESS) {
    //   const user = action.payload;
    //   dispatch(getUser(user.uid));
    // } else
    if (action.type === SIGN_IN_FAIL) {
      dispatch(uiActions.setError(action.payload));
      dispatch(uiActions.hideLoading());
    }
  };
export const processSignOutResult =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === SIGN_OUT_SUCCESS) {
      dispatch(userActions.setUser({ user: null }));
      dispatch(uiActions.hideLoading());
    } else if (action.type === SIGN_OUT_FAIL) {
      dispatch(uiActions.setError(action.payload));
      dispatch(uiActions.hideLoading());
    }
  };

export const processGetUserResult =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_USER_SUCCESS) {
      dispatch(userActions.setUser({ user: action.payload }));
      dispatch(uiActions.hideLoading());
    } else if (action.type === GET_USER_FAIL) {
      dispatch(uiActions.setError(action.payload));
      dispatch(uiActions.hideLoading());
    }
  };

export const processSaveUserResult =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === SAVE_USER_SUCCESS) {
      // dispatch(userActions.setUser({ user: action.payload }));
      dispatch(uiActions.hideLoading());
    } else if (action.type === SAVE_USER_FAIL) {
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
