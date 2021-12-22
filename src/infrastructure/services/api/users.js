import { db } from "../../../firebase";
import {
  collection,
  setDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";

const userApi = {
  saveUser: async (user) => {
    try {
      const response = await setDoc(doc(db, "users", user.uid), user);
      return response;
    } catch (e) {
      throw e;
    }
  },

  getUser: async (id) => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", id));
      const querySnapshot = await getDocs(q);
      let data = null;
      if (querySnapshot) {
        querySnapshot.forEach((doc) => {
          data = doc.data();
        });
      }
      return data;
    } catch (e) {
      throw e;
    }
  },
};

export default userApi;
