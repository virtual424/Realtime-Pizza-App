import { useSelector, useDispatch } from "react-redux";
import styles from "./Navbar.module.css";
import logo from "../assets/img/logo.png";
import { signout } from "../store/authSlice";
import cart from "../assets/img/cart.png";
import { Link } from "react-router-dom";
import Async from "./UI/Async";
import React from "react";

const Navbar = () => {
  const user = useSelector((state) => state.authReducer.user);
  const status = useSelector((state) => state.authReducer.status);
  const dispatch = useDispatch();

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(signout());
  };

  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="logo" />
      </Link>
      <Async color="#fe5f1e">
        <div className={styles.menu}>
          <ul>
            {user && (
              <li>
                <Link to="/menu">Menu</Link>
              </li>
            )}
            {user && (
              <li>
                <Link to="/offers">Offers</Link>
              </li>
            )}
            {!user && status !== "" && status !== "LOADING" && (
              <React.Fragment>
                <li>
                  <Link to="/register">Register</Link>
                </li>

                <li>
                  <Link to="/login">Login</Link>
                </li>
              </React.Fragment>
            )}

            {user && (
              <li>
                <Link to="" onClick={logoutHandler}>
                  Logout
                </Link>
              </li>
            )}
            {user && (
              <li className={styles.cartLogo}>
                <Link to="/cart">
                  <img src={cart} alt="cart icon" />
                  {/* <span>5</span> */}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </Async>
    </div>
  );
};

export default Navbar;
