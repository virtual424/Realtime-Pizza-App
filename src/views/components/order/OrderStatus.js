import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./OrderStatus.module.css";
import { statusList } from "./TableRow";

const OrderStatus = () => {
  const { orderId } = useParams();

  const currentOrderStatus = useSelector((state) => {
    const orderList = state.orderReducer.order;
    const currentOrder = orderList.find((order) => order.id === orderId);
    return currentOrder.status;
  });

  return (
    <div className={styles.orderStatus}>
      <div className={styles.statusContainer}>
        <div className={styles.heading}>
          <h2>Track Order Status</h2>
          <p>{orderId}</p>
        </div>
        <ul>
          {statusList.map((item) => {
            let dynamicClassname = "";
            const currSeqId = statusList.find(
              (item) => item.status === currentOrderStatus
            ).seqId;
            if (item.status === currentOrderStatus) {
              dynamicClassname = styles.currentStep;
            } else if (item.seqId < currSeqId) {
              dynamicClassname = styles.stepCompleted;
            }

            return (
              <li className={`${styles.statusLine} ${dynamicClassname}`}>
                <span>{item.status}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default OrderStatus;
