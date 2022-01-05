import * as menuAction from "../actions/Menu";
import { menuActions } from "../reducers/menuSlice";
import { uiActions } from "../reducers/uiSlice";

export const getMenu =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === menuAction.GET_MENU) {
      dispatch(menuAction.getMenuRequest());
      dispatch(uiActions.showLoading());
    }
  };

export const getMenuRequestMdl =
  ({ api }) =>
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);

    if (action.type === menuAction.GET_MENU_REQUEST) {
      try {
        const data = await api.menu.getMenu();
        if (data) {
          dispatch(menuAction.getMenuSuccess(data));
        }
      } catch (error) {
        dispatch(menuAction.getMenuFail(error));
      }
    }
  };

export const processGetMenuResult =
  () =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === menuAction.GET_MENU_SUCCESS) {
      dispatch(menuActions.setMenu(action.payload));
      dispatch(uiActions.hideLoading());
    } else if (action.type === menuAction.GET_MENU_FAIL) {
      dispatch(uiActions.setError(action.payload));
      dispatch(uiActions.hideLoading());
    }
  };

export const addPizzaMdl =
  ({ api }) =>
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);

    switch (action.type) {
      case menuAction.ADD_PIZZA:
        dispatch(menuAction.addPizzaRequest(action.payload));
        dispatch(uiActions.showLoading());
      case menuAction.ADD_PIZZA_REQUEST:
        try {
          //make api call
          await api.menu.addPizza(action.payload);
          //on success
          dispatch(menuAction.addPizzaSuccess());
        } catch (error) {
          dispatch(menuAction.addPizzaFailure(error));
        }
      case menuAction.ADD_PIZZA_FAILURE:
        dispatch(uiActions.setError(action.payload));
    }
  };

export const editPizzaMdl =
  ({ api }) =>
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);

    switch (action.type) {
      case menuAction.EDIT_PIZZA:
        dispatch(menuAction.editPizzaRequest(action.payload));
        dispatch(uiActions.showLoading());
      case menuAction.EDIT_PIZZA_REQUEST:
        try {
          //make api call
          await api.menu.editPizza(action.payload);
          //on success
          dispatch(menuAction.editPizzaSuccess());
        } catch (error) {
          dispatch(menuAction.editPizzaFailure(error));
        }
      case menuAction.EDIT_PIZZA_FAILURE:
        dispatch(uiActions.setError(action.payload));
    }
  };

export const menuMdl = [
  getMenu,
  getMenuRequestMdl,
  processGetMenuResult,
  addPizzaMdl,
  editPizzaMdl,
];
