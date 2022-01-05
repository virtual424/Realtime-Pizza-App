import { db } from "../../../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  where,
  updateDoc,
  increment,
  query,
  getDocs,
  getDoc,
} from "firebase/firestore";

const orderApi = {
  createOrder: async (data, uid) => {
    try {
      const orderRef = collection(db, `Order`);
      const currDate = new Date().toString();
      const orderObj = {
        uid: uid,
        Date: currDate.slice(0, currDate.lastIndexOf(" ")),
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
  getOrder: async (uid) => {
    try {
      const orderRef = collection(db, `Order`);
      let querySnapshot;
      if (!uid) {
        querySnapshot = await getDocs(orderRef);
      } else {
        const q = query(orderRef, where("uid", "==", `${uid}`));
        querySnapshot = await getDocs(q);
      }
      let orderList = [];
      querySnapshot.forEach((orderItem) => {
        orderList.push({ id: orderItem.id, ...orderItem.data() });
      });
      return orderList;
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
