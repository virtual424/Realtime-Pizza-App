import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice.js";
import orderReducer from "./reducers/orderSlice";
import uiReducer from "./reducers/uiSlice.js";
import menuReducer from "./reducers/menuSlice";
import { asyncMdl } from "./middleware/async";
import { authMdl } from "./middleware/auth";
import { normalizeMdl } from "./middleware/normalize";
import services from "../infrastructure/services/index.js";
import { menuMdl } from "./middleware/menu.js";
import { cartMdl } from "./middleware/cart.js";
import { orderMdl } from "./middleware/order.js";
import cartReducer from "./reducers/cartSlice";

const middlewares = [
  ...authMdl,
  ...asyncMdl,
  ...normalizeMdl,
  ...menuMdl,
  ...cartMdl,
  ...orderMdl,
].map((f) => f(services));

const store = configureStore({
  reducer: {
    uiReducer: uiReducer,
    userReducer: userReducer,
    menuReducer: menuReducer,
    cartReducer: cartReducer,
    orderReducer: orderReducer,
  },
  middleware: middlewares,
});

export default store;
