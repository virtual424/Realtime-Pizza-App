export const GET_MENU = "[menu] GET_MENU";
export const GET_MENU_REQUEST = "[menu] GET_MENU_REQUEST";
export const GET_MENU_SUCCESS = "[menu] GET_MENU_SUCCESS";
export const GET_MENU_FAIL = "[menu] GET_MENU_FAIL";
export const ADD_PIZZA = "[menu] ADD_PIZZA";
export const ADD_PIZZA_REQUEST = "[menu] ADD_PIZZA_REQUEST";
export const ADD_PIZZA_SUCCESS = "[menu] ADD_PIZZA_SUCCESS";
export const ADD_PIZZA_FAILURE = "[menu] ADD_PIZZA_FAILURE";
export const EDIT_PIZZA = "[menu] EDIT_PIZZA";
export const EDIT_PIZZA_REQUEST = "[menu] EDIT_PIZZA_REQUEST";
export const EDIT_PIZZA_SUCCESS = "[menu] EDIT_PIZZA_SUCCESS";
export const EDIT_PIZZA_FAILURE = "[menu] EDIT_PIZZA_FAILURE";

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

export const addPizza = (data) => {
  return {
    type: ADD_PIZZA,
    payload: data,
  };
};
export const addPizzaRequest = (data) => {
  return {
    type: ADD_PIZZA_REQUEST,
    payload: data,
  };
};
export const addPizzaSuccess = () => {
  return {
    type: ADD_PIZZA_SUCCESS,
  };
};

export const addPizzaFailure = (error) => {
  return {
    type: ADD_PIZZA_FAILURE,
    payload: error,
  };
};
export const editPizza = (data) => {
  return {
    type: EDIT_PIZZA,
    payload: data,
  };
};
export const editPizzaRequest = (data) => {
  return {
    type: EDIT_PIZZA_REQUEST,
    payload: data,
  };
};
export const editPizzaSuccess = () => {
  return {
    type: EDIT_PIZZA_SUCCESS,
  };
};

export const editPizzaFailure = (error) => {
  return {
    type: EDIT_PIZZA_FAILURE,
    payload: error,
  };
};
