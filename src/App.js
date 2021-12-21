import Home from "./Pages/Home";
import { useEffect } from "react";
import Menu from "./Pages/Menu";
import Navbar from "./components/Navbar.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "@firebase/auth";
import Cart from "./Pages/Customers/Cart";
import Register from "./Pages/auth/Register";
import { getUser } from "./store/actions/auth";
import Login from "./Pages/auth/Login";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const pending = useSelector((state) => state.uiReducer.pending);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getUser(user.uid));
      }
      navigate("/");
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        {user && <Route path="/menu" element={<Menu />} />}
        {user && <Route path="/cart" element={<Cart />} />}
        {!user && <Route path="/register" element={<Register />} />}
        {(!user || pending) && <Route path="/login" element={<Login />} />}
      </Routes>
    </>
  );
}

export default App;
