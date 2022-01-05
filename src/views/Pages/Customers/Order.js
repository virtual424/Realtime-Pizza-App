import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOrder } from "../../../store/actions/Order";

const Order = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);
  return (
    <div>
      <h1>Order Page</h1>
    </div>
  );
};

export default Order;
