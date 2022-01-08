import { removeFromCart } from "../actions/cart";
import * as orderActions from "../actions/Order";
import { orderAction } from "../reducers/orderSlice";
import { uiActions } from "../reducers/uiSlice";

export const createOrderMdl =
  ({ api }) =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    next(action);

    switch (action.type) {
      case orderActions.CREATE_ORDER:
        dispatch(orderActions.createOrderRequest(action.payload));
        dispatch(uiActions.showLoading());
        break;
      case orderActions.CREATE_ORDER_REQUEST:
        try {
          //make api call
          const uid = getState().userReducer.user.uid;
          await api.order.createOrder(action.payload, uid);
          //onSuccess
          dispatch(orderActions.createOrderSuccess());
        } catch (error) {
          dispatch(orderActions.createOrderFail(error));
        }
        break;
      case orderActions.CREATE_ORDER_SUCCESS:
        dispatch(removeFromCart());
        break;
      case orderActions.CREATE_ORDER_FAIL:
        dispatch(uiActions.setError(action.payload));
        dispatch(uiActions.hideLoading());
        break;
      default:
    }
  };

export const getOrderMdl =
  ({ api }) =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    next(action);

    switch (action.type) {
      case orderActions.GET_ORDER:
        dispatch(orderActions.getOrderRequest());
        dispatch(uiActions.showLoading());
        break;
      case orderActions.GET_ORDER_REQUEST:
        try {
          //make api call
          const { type, uid } = getState().userReducer.user;
          if (type === "Admin") {
            await api.order.getOrder("", (orderList) => {
              if (orderList) {
                dispatch(orderActions.getOrderSuccess(orderList));
              }
            });
          } else {
            await api.order.getOrder(uid, (orderList) => {
              if (orderList) {
                dispatch(orderActions.getOrderSuccess(orderList));
              }
            });
          }
          //onSuccess
        } catch (error) {
          dispatch(orderActions.getOrderFail(error));
        }
        break;
      case orderActions.GET_ORDER_SUCCESS:
        dispatch(orderAction.setOrder(action.payload));
        dispatch(uiActions.hideLoading());
        break;
      case orderActions.GET_ORDER_FAIL:
        dispatch(uiActions.setError(action.payload));
        dispatch(uiActions.hideLoading());
        break;
      default:
    }
  };

export const updateOrderStatusMdl =
  ({ api }) =>
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);

    switch (action.type) {
      case orderActions.UPDATE_ORDER_STATUS:
        dispatch(orderActions.updateOrderStatusRequest(action.payload));
        break;
      case orderActions.UPDATE_ORDER_STATUS_REQUEST:
        try {
          await api.order.updateOrderStatus(action.payload);
          dispatch(orderActions.updateOrderStatusSuccess());
        } catch (error) {
          dispatch(orderActions.updateOrderStatusFailure(error));
        }
        break;
      case orderActions.UPDATE_ORDER_STATUS_SUCCESS:
        break;
      case orderActions.UPDATE_ORDER_STATUS_FAILURE:
        dispatch(uiActions.setError(action.payload));
        break;
      default:
    }
  };

export const orderMdl = [createOrderMdl, getOrderMdl, updateOrderStatusMdl];
