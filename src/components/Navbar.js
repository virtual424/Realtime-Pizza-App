import React from "react";
import styles from "./Navbar.module.css";
import logo from "../assets/img/logo.png";
import cart from "../assets/img/cart.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="logo" />
      </Link>
      <div className={styles.menu}>
        <ul>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/offers">Offers</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li className={styles.cartLogo}>
            <Link to="/cart">
              <img src={cart} alt="cart icon" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
