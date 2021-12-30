import {
  GET_MENU,
  GET_MENU_REQUEST,
  getMenuRequest,
  getMenuSuccess,
  getMenuFail,
  GET_MENU_SUCCESS,
  GET_MENU_FAIL,
} from "../actions/Menu";
import { menuActions } from "../reducers/menuSlice";
import { uiActions } from "../reducers/uiSlice";

export const getMenu =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === GET_MENU) {
      dispatch(getMenuRequest());
      dispatch(uiActions.showLoading());
    }
  };

export const getMenuRequestMdl =
  ({ api }) =>
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);

    if (action.type === GET_MENU_REQUEST) {
      try {
        const data = await api.menu.getMenu();
        if (data) {
          dispatch(getMenuSuccess(data));
        }
      } catch (error) {
        dispatch(getMenuFail(error));
      }
    }
  };

export const processGetMenuResult =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_MENU_SUCCESS) {
      dispatch(menuActions.setMenu(action.payload));
      dispatch(uiActions.hideLoading());
    } else if (action.type === GET_MENU_FAIL) {
      dispatch(uiActions.setError(action.payload));
      dispatch(uiActions.hideLoading());
    }
  };

export const menuMdl = [getMenu, getMenuRequestMdl, processGetMenuResult];
