import * as cartActions from "../actions/cart";
import { uiActions } from "../reducers/uiSlice";

export const addToCartMdl =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === cartActions.ADD_TO_CART) {
      dispatch(cartActions.addToCartRequest(action.payload));
      dispatch(uiActions.showLoading());
    }
  };

export const addToCartRequestMdl =
  ({ api }) =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    next(action);

    if (action.type === cartActions.ADD_TO_CART_REQUEST) {
      try {
        const uid = getState().userReducer.user.uid;
        const data = await api.cart.addToCart(action.payload, uid);
        dispatch(cartActions.addToCartSuccess(data));
      } catch (error) {
        dispatch(cartActions.addToCartFail(error));
      }
    }
  };

export const processAddToCartResultMdl =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === cartActions.ADD_TO_CART_SUCCESS) {
      dispatch(uiActions.hideLoading());
    } else if (action.type === cartActions.ADD_TO_CART_FAIL) {
      dispatch(uiActions.setError(action.payload));
      dispatch(uiActions.hideLoading());
    }
  };

export const getCartMdl =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === cartActions.GET_CART) {
      dispatch(cartActions.getCartRequest(action.payload));
      dispatch(uiActions.showLoading());
    }
  };

export const getCartRequestMdl =
  ({ api }) =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    next(action);

    if (action.type === cartActions.GET_CART_REQUEST) {
      try {
        const state = getState();
        const uid = state.userReducer.user.uid;
        const data = await api.cart.getCart(uid);
        if (data) {
          dispatch(cartActions.getCartSuccess(data));
        }
      } catch (error) {
        dispatch(cartActions.getCartFail(error));
      }
    }
  };

export const processGetCartResultMdl =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === cartActions.GET_CART_SUCCESS) {
      dispatch(cartActions.normalizeCart(action.payload));
    } else if (action.type === cartActions.ADD_TO_CART_FAIL) {
      dispatch(uiActions.setError(action.payload));
      dispatch(uiActions.hideLoading());
    }
  };

export const removeFromCartMdl =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === cartActions.REMOVE_FROM_CART) {
      dispatch(cartActions.removeFromCartRequest(action.payload));
      dispatch(uiActions.showLoading());
    }
  };

export const removeFromCartRequestMdl =
  ({ api }) =>
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);

    if (action.type === cartActions.REMOVE_FROM_CART_REQUEST) {
      try {
        await api.cart.removeFromCart(action.payload);
        dispatch(cartActions.removeFromCartSuccess());
      } catch (error) {
        dispatch(cartActions.removeFromCartFail(error));
      }
    }
  };

export const processRemoveFromCartResultMdl =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === cartActions.REMOVE_FROM_CART_SUCCESS) {
      dispatch(uiActions.hideLoading());
    } else if (action.type === cartActions.REMOVE_FROM_CART_FAIL) {
      dispatch(uiActions.setError(action.payload));
      dispatch(uiActions.hideLoading());
    }
  };

export const cartMdl = [
  addToCartMdl,
  addToCartRequestMdl,
  processAddToCartResultMdl,
  getCartMdl,
  getCartRequestMdl,
  processGetCartResultMdl,
  removeFromCartMdl,
  removeFromCartRequestMdl,
  processRemoveFromCartResultMdl,
];