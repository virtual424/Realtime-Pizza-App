import { auth } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const authApi = {
  signUp: async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return response;
    } catch (e) {
      throw e;
    }
  },
  signIn: async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return response;
    } catch (e) {
      throw e;
    }
  },
  signOut: async () => {
    try {
      const response = await signOut(auth);
      return response;
    } catch (e) {
      throw e;
    }
  },
};

export default authApi;
