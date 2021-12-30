import { db } from "../../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const menuApi = {
  getMenu: () =>
    new Promise((resolve, reject) => {
      const unsubscribe = onSnapshot(
        collection(db, "Menu"),
        (snapshot) => {
          let menuList = [];
          if (snapshot) {
            snapshot.forEach((doc) => {
              menuList.push({ id: doc.id, ...doc.data() });
            });
            resolve(menuList);
          }
        },
        (error) => {
          reject(error);
        }
      );
    }),
};

export default menuApi;
