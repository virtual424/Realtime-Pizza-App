import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const authInitialState = { user: null, status: "", error: "" };

export const signup = createAsyncThunk(
  "auth/signup",
  async (userObj, { dispatch, rejectWithValue }) => {
    const { name, email, password, userType } = userObj;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        const user = userCredential.user;
        const newUser = {
          uid: user.uid,
          name,
          email,
          userType,
        };
        await dispatch(saveUser(newUser));
        return newUser;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (userObj, { dispatch, rejectWithValue }) => {
    const { email, password } = userObj;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("userCredential", userCredential);
      if (userCredential) {
        const user = userCredential.user;
        await dispatch(getUser(user.uid));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signout = createAsyncThunk(
  "auth/signout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveUser = createAsyncThunk(
  "db/saveUser",
  async (userObj, { rejectWithValue }) => {
    try {
      await setDoc(doc(db, "users", userObj.uid), userObj);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "db/getUser",
  async (id, { rejectWithValue }) => {
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
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  if (action.error.message === "Rejected") {
    state.error = action.payload;
  } else {
    state.error = action.error.message;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload.errorMessage;
    },
    setStatus(state, action) {
      state.status = action.payload.status;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signup.pending, (state, action) => {
        state.status = "LOADING";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "SUCCESS";
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "REJECTED";
        setError(state, action);
      })
      .addCase(signin.pending, (state, action) => {
        state.status = "LOADING";
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = "REJECTED";
        setError(state, action);
      })
      .addCase(signout.pending, (state, action) => {
        state.status = "LOADING";
      })
      .addCase(signout.fulfilled, (state, action) => {
        state.status = "SUCCESS";
        state.user = null;
      })
      .addCase(signout.rejected, (state, action) => {
        state.status = "REJECTED";
        console.log(action.error.message);
        setError(state, action);
      })
      .addCase(saveUser.rejected, (state, action) => {
        state.status = "REJECTED";
        setError(state, action);
      })
      .addCase(getUser.pending, (state, action) => {
        state.status = "LOADING";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "SUCCESS";
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "REJECTED";
        setError(state, action);
      });
  },
});

export default authSlice;
export const authActions = authSlice.actions;
