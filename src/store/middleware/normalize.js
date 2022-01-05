import { NORMALIZE_USER, saveUser } from "../actions/auth";
import { NORMALIZE_CART } from "../actions/cart";
import { cartAction } from "../reducers/cartSlice";
import { uiActions } from "../reducers/uiSlice";

export const normalizeUser =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === NORMALIZE_USER) {
      const { user, type } = action.payload;

      const newUser = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        type: type,
      };

      dispatch(saveUser(newUser));
    }
  };

export const normalizeCart =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === NORMALIZE_CART) {
      const cartList = action.payload;

      const totalAmount = cartList.reduce((acc, curr) => {
        acc = acc + curr.Quantity * Number(curr.Price);
        return acc;
      }, 0);
      const totalItems = cartList.reduce((acc, curr) => {
        acc = acc + curr.Quantity;
        return acc;
      }, 0);
      const data = { cart: cartList, totalAmount, totalItems };
      dispatch(cartAction.setCart(data));
      dispatch(uiActions.hideLoading());
    }
  };

export const normalizeMdl = [normalizeUser, normalizeCart];
