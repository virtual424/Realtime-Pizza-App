import React from "react";
import { Link } from "react-router-dom";
import styles from "../Order.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../../../../store/actions/Order";

export const ORDER_PLACED = { status: "Placed", seqId: 1 };
export const ORDER_CONFIRMATION = { status: "Confirmed", seqId: 2 };
export const PREPARATION = { status: "Preparing", seqId: 3 };
export const OUT_FOR_DELIVERY = { status: "Out for delivery", seqId: 4 };
export const COMPLETE = { status: "Complete", seqId: 5 };

export const statusList = [
  ORDER_PLACED,
  ORDER_CONFIRMATION,
  PREPARATION,
  OUT_FOR_DELIVERY,
  COMPLETE,
];

const TableRow = ({ order, type }) => {
  const dispatch = useDispatch();

  const updateOrderStatusHandler = (event) => {
    dispatch(
      updateOrderStatus({ orderId: order.id, status: event.target.value })
    );
  };

  const currentOrderStatus = useSelector((state) => {
    const orderList = state.orderReducer.order;
    const orderId = order.id;
    const currentOrder = orderList.find((order) => order.id === orderId);
    return currentOrder.status;
  });

  const completeClassname =
    currentOrderStatus === COMPLETE.status ? styles.orderComplete : "";

  return (
    <tr>
      <td>
        <Link
          to={type === "Customer" && `/order/${order.id}`}
          className={completeClassname}
        >
          {order.id}
        </Link>
        {order.items.map((item) => {
          return (
            <p key={item.id}>
              <span>{item.Name}: </span>
              <span>{item.Quantity}</span>
            </p>
          );
        })}
      </td>
      <td>{order.Address}</td>
      <td>{order.Date}</td>
      {type === "Admin" && (
        <td>
          <select name="status" id="status" onChange={updateOrderStatusHandler}>
            {statusList.map((item) => (
              <option value={item.status}>{item.status}</option>
            ))}
          </select>
        </td>
      )}
      {type === "Customer" && (
        <>
          <td>Rs. {order.Amount}</td>
          <td>{order.Quantity}</td>
        </>
      )}
    </tr>
  );
};

export default TableRow;
