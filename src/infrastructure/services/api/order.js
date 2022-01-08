import { db } from "../../../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

const orderApi = {
  createOrder: async (data, uid) => {
    try {
      const orderRef = collection(db, `Order`);
      const currDate = new Date().toString();
      const orderObj = {
        uid: uid,
        Date: currDate.slice(0, currDate.indexOf("G") - 1),
        Amount: data.cartState.totalAmount,
        Quantity: data.cartState.totalItems,
        items: data.cartState.cart,
        Address: data.address,
        status: "Order placed",
      };
      await addDoc(orderRef, orderObj);
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  getOrder: async (uid, callback) => {
    try {
      const orderRef = collection(db, `Order`);

      onSnapshot(orderRef, (snapshot) => {
        let orderList = [];
        if (snapshot) {
          snapshot.forEach((orderItem) => {
            if (!uid) {
              orderList.push({ id: orderItem.id, ...orderItem.data() });
            } else {
              if (orderItem.data().uid === uid) {
                orderList.push({ id: orderItem.id, ...orderItem.data() });
              }
            }
          });
        }
        callback(orderList);
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  updateOrderStatus: async (orderDetails) => {
    try {
      const { orderId, status: orderStatus } = orderDetails;
      const orderDocRef = doc(db, `Order/${orderId}`);
      await updateDoc(orderDocRef, {
        status: orderStatus,
      });
    } catch (e) {
      throw e;
    }
  },
};

export default orderApi;
