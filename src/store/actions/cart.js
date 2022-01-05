export const ADD_TO_CART = "[cart] ADD_TO_CART";
export const ADD_TO_CART_REQUEST = "[cart] ADD_TO_CART_REQUEST";
export const ADD_TO_CART_SUCCESS = "[cart] ADD_TO_CART_SUCCESS";
export const ADD_TO_CART_FAIL = "[cart] ADD_TO_CART_FAIL";
export const GET_CART = "[cart] GET_CART";
export const GET_CART_REQUEST = "[cart] GET_CART_REQUEST";
export const GET_CART_SUCCESS = "[cart] GET_CART_SUCCESS";
export const NORMALIZE_CART = "[cart] NORMALIZE_CART";
export const GET_CART_FAIL = "[cart] GET_CART_FAIL";
export const GET_TOTAL_CART_ITEMS = "[cart] GET_TOTAL_CART_ITEMS";
export const REMOVE_FROM_CART = "[cart] REMOVE_FROM_CART";
export const REMOVE_FROM_CART_REQUEST = "[cart] REMOVE_FROM_CART_REQUEST";
export const REMOVE_FROM_CART_SUCCESS = "[cart] REMOVE_FROM_CART_SUCCESS";
export const REMOVE_FROM_CART_FAIL = "[cart] REMOVE_FROM_CART_FAIL";

export const addToCart = (data) => ({ type: ADD_TO_CART, payload: data });

export const addToCartRequest = (data) => ({
  type: ADD_TO_CART_REQUEST,
  payload: data,
});

export const addToCartSuccess = (data) => ({
  type: ADD_TO_CART_SUCCESS,
  payload: data,
});

export const addToCartFail = (error) => ({
  type: ADD_TO_CART_FAIL,
  payload: error,
});

export const getCart = () => ({ type: GET_CART });

export const getCartRequest = () => ({ type: GET_CART_REQUEST });

export const getCartSuccess = (data) => ({
  type: GET_CART_SUCCESS,
  payload: data,
});

export const getCartFail = (error) => ({
  type: GET_CART_SUCCESS,
  payload: error,
});

export const normalizeCart = (data) => ({
  type: NORMALIZE_CART,
  payload: data,
});

export const removeFromCart = () => ({ type: REMOVE_FROM_CART });

export const removeFromCartRequest = () => ({
  type: REMOVE_FROM_CART_REQUEST,
});

export const removeFromCartSuccess = () => ({
  type: REMOVE_FROM_CART_SUCCESS,
});

export const removeFromCartFail = (error) => ({
  type: REMOVE_FROM_CART_FAIL,
  payload: error,
});

export const getTotalCartItems = (data) => {
  return {
    type: GET_TOTAL_CART_ITEMS,
    payload: data,
  };
};
