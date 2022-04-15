import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../../store/actions/Order";
import TableRow from "./components/TableRow";
import styles from "./Order.module.css";

const Order = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderReducer.order);
  const { type } = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  return (
    <div className={styles.orderPage}>
      <div className={styles.container}>
        <h2>All Orders</h2>
        {orders.length === 0 && <p>No orders </p>}
        {orders.length !== 0 && (
          <table cellSpacing="0">
            <thead>
              <tr>
                <th>Orders</th>
                <th>Address</th>
                <th>Time</th>
                {type === "Customer" && <th>Total amount</th>}
                {type === "Customer" && <th>Total Quantity</th>}
                {type === "Admin" && <th>Status</th>}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return <TableRow key={order.id} order={order} type={type} />;
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Order;
