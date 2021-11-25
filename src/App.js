import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import Navbar from "./components/Navbar.js";
import { Routes, Route } from "react-router-dom";
import Cart from "./Pages/Customers/Cart";
import Register from "./Pages/auth/Register";
import Login from "./Pages/auth/Login";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
