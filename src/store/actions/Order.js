export const CREATE_ORDER = "[order] CREATE_ORDER";
export const CREATE_ORDER_REQUEST = "[order] CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "[order] CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAIL = "[order] CREATE_ORDER_FAIL";
export const GET_ORDER = "[order] GET_ORDER";
export const GET_ORDER_REQUEST = "[order] GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "[order] GET_ORDER_SUCCESS";
export const GET_ORDER_FAIL = "[order] GET_ORDER_FAIL";
export const UPDATE_ORDER_STATUS = "[order] UPDATE_ORDER_STATUS";
export const UPDATE_ORDER_STATUS_REQUEST =
  "[order] UPDATE_ORDER_STATUS_REQUEST";
export const UPDATE_ORDER_STATUS_SUCCESS =
  "[order] UPDATE_ORDER_STATUS_SUCCESS";
export const UPDATE_ORDER_STATUS_FAILURE =
  "[order] UPDATE_ORDER_STATUS_FAILURE";

export const createOrder = (data) => {
  return { type: CREATE_ORDER, payload: data };
};

export const createOrderRequest = (data) => {
  return {
    type: CREATE_ORDER_REQUEST,
    payload: data,
  };
};

export const createOrderSuccess = () => {
  return {
    type: CREATE_ORDER_SUCCESS,
  };
};

export const createOrderFail = (error) => {
  return {
    type: CREATE_ORDER_FAIL,
    payload: error,
  };
};
export const getOrder = () => {
  return { type: GET_ORDER };
};

export const getOrderRequest = () => {
  return {
    type: GET_ORDER_REQUEST,
  };
};

export const getOrderSuccess = (data) => {
  return {
    type: GET_ORDER_SUCCESS,
    payload: data,
  };
};

export const getOrderFail = (error) => {
  return {
    type: GET_ORDER_FAIL,
    payload: error,
  };
};

export const updateOrderStatus = (data) => {
  return {
    type: UPDATE_ORDER_STATUS,
    payload: data,
  };
};
export const updateOrderStatusRequest = (data) => {
  return {
    type: UPDATE_ORDER_STATUS_REQUEST,
    payload: data,
  };
};
export const updateOrderStatusSuccess = () => {
  return {
    type: UPDATE_ORDER_STATUS_SUCCESS,
  };
};
export const updateOrderStatusFailure = (error) => {
  return {
    type: UPDATE_ORDER_STATUS_FAILURE,
    payload: error,
  };
};
