export const GET_MENU = "[menu] GET_MENU";
export const GET_MENU_REQUEST = "[menu] GET_MENU_REQUEST";
export const GET_MENU_SUCCESS = "[menu] GET_MENU_SUCCESS";
export const GET_MENU_FAIL = "[menu] GET_MENU_FAIL";

export const getMenu = () => ({
  type: GET_MENU,
});

export const getMenuRequest = () => ({
  type: GET_MENU_REQUEST,
});

export const getMenuSuccess = (data) => ({
  type: GET_MENU_SUCCESS,
  payload: data,
});

export const getMenuFail = (error) => ({
  type: GET_MENU_FAIL,
  payload: error,
});
