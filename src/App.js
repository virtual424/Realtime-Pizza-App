import Home from "./Pages/Home";
import { useEffect } from "react";
import Menu from "./Pages/Menu";
import Navbar from "./components/Navbar.js";
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { onAuthStateChanged } from "@firebase/auth";
import Cart from "./Pages/Customers/Cart";
import Register from "./Pages/auth/Register";
import Login from "./Pages/auth/Login";
import { authActions, getUser } from "./store/authSlice";
import Async from "./components/UI/Async";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const status = useSelector((state) => state.authReducer.status);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getUser(user.uid));
      } else {
        dispatch(authActions.setStatus({ status: "READY" }));
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {user && <Route path="/menu" element={<Menu />} />}
        {user && <Route path="/cart" element={<Cart />} />}
        {!user && <Route path="/register" element={<Register />} />}
        {!user && <Route path="/login" element={<Login />} />}
      </Routes>
    </>
  );
}

export default App;
