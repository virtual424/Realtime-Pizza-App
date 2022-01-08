import { db } from "../../../firebase";
import {
  collection,
  setDoc,
  onSnapshot,
  deleteDoc,
  doc,
  where,
  updateDoc,
  increment,
  query,
  getDocs,
} from "firebase/firestore";

const cartApi = {
  getCart: (id, callback) =>
    new Promise((resolve, reject) => {
      const cartRef = collection(db, `users/${id}/Cart`);
      onSnapshot(
        cartRef,
        (snapshot) => {
          let cartList = [];
          if (snapshot) {
            snapshot.forEach((doc) => {
              cartList.push({ id: doc.id, ...doc.data() });
            });
          }
          callback(cartList);
          // resolve(cartList);
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    }),

  addToCart: async (data, uid) => {
    try {
      const cartRef = collection(db, `users/${uid}/Cart`);
      const cartRef2 = doc(db, `users/${uid}/Cart/${data.id}`);
      const q = query(cartRef, where("Name", "==", `${data.Name}`));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length === 0) {
        await setDoc(cartRef2, {
          ...data,
          Quantity: 1,
        });
      } else {
        await updateDoc(cartRef2, {
          Quantity: increment(1),
        });
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  removeFromCart: async (uid) => {
    try {
      const cartRef = collection(db, `users/${uid}/Cart`);
      const querySnapshot = await getDocs(cartRef);
      querySnapshot.forEach(async (item) => {
        await deleteDoc(doc(db, `users/${uid}/Cart/${item.ref.id}`));
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
};

export default cartApi;
