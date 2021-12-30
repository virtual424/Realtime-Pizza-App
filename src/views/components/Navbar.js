import { useSelector, useDispatch } from "react-redux";
import styles from "./Navbar.module.css";
import logo from "../assets/img/logo.png";
import { signOut } from "../../store/actions/auth";
import cart from "../assets/img/cart.png";
import { Link } from "react-router-dom";
import LoadingContainer from "./UI/LoadingContainer";
import React from "react";

const Navbar = () => {
  const user = useSelector((state) => state.userReducer.user);
  const pending = useSelector((state) => state.uiReducer.pending);
  const totalItems = useSelector((state) => state.cartReducer.totalItems);
  const dispatch = useDispatch();

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(signOut());
  };

  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="logo" />
      </Link>
      <LoadingContainer>
        <div className={styles.menu}>
          <ul>
            {user && (
              <li>
                <Link to="/menu">Menu</Link>
              </li>
            )}
            {user && (
              <li>
                <Link to="/myOrders">My orders</Link>
              </li>
            )}
            {!user && !pending && (
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
              <Link to="/cart">
                <li className={styles.cartLogo}>
                  <img src={cart} alt="cart icon" />
                  <span>{totalItems}</span>
                </li>
              </Link>
            )}
          </ul>
        </div>
      </LoadingContainer>
    </div>
  );
};

export default Navbar;
