import { db } from "../../../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  setDoc,
  doc,
} from "firebase/firestore";

const menuApi = {
  getMenu: (callback) =>
    new Promise((resolve, reject) => {
      onSnapshot(
        collection(db, "Menu"),
        (snapshot) => {
          let menuList = [];
          if (snapshot) {
            snapshot.forEach((doc) => {
              menuList.push({ id: doc.id, ...doc.data() });
            });
            callback(menuList);
          }
        },
        (error) => {
          reject(error);
        }
      );
    }),

  addPizza: async (data) => {
    try {
      await addDoc(collection(db, "Menu"), data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  editPizza: async ({ menuId, menu }) => {
    try {
      await setDoc(doc(db, "Menu", `${menuId}`), menu);
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
};

export default menuApi;
