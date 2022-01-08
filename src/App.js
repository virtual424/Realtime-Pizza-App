import Home from "./views/Pages/Home";
import { useEffect } from "react";
import Navbar from "./views/components/Navbar.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "@firebase/auth";
import Cart from "./views/Pages/Customers/Cart";
import Register from "./views//Pages/auth/Register";
import { getUser } from "./store/actions/auth";
import Login from "./views/Pages/auth/Login";
import { uiActions } from "./store/reducers/uiSlice";
import MenuSectionContainer from "./views/components/Menu/MenuSectionContainer";
import Order from "./views/Pages/Order";
import OrderStatus from "./views/components/order/OrderStatus";
import AddPizzaModal from "./views/components/Menu/AddPizzaModal";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const { pending } = useSelector((state) => state.uiReducer);
  const { showModal } = useSelector((state) => state.menuReducer);
  const menu = useSelector((state) => state.menuReducer.menu);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getUser(user.uid));
      } else {
        dispatch(uiActions.hideLoading());
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
        {user && (
          <Route path="/menu" element={<MenuSectionContainer menu={menu} />} />
        )}
        {user && <Route path="/cart" element={<Cart />} />}
        {user && (
          <Route path="/order/:orderId" exact element={<OrderStatus />} />
        )}
        {user && <Route path="/order" element={<Order />} />}
        {!user && <Route path="/register" element={<Register />} />}
        {(!user || pending) && <Route path="/login" element={<Login />} />}
      </Routes>
      {user && showModal && <AddPizzaModal />}
    </>
  );
}

export default App;
