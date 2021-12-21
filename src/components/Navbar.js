import { useSelector, useDispatch } from "react-redux";
import styles from "./Navbar.module.css";
import logo from "../assets/img/logo.png";
import { signOut } from "../store/actions/auth";
import cart from "../assets/img/cart.png";
import { Link } from "react-router-dom";
import LoadingContainer from "./UI/LoadingContainer";
import React from "react";

const Navbar = () => {
  const user = useSelector((state) => state.userReducer.user);
  const pending = useSelector((state) => state.uiReducer.pending);
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
                <Link to="/offers">Offers</Link>
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
              <li className={styles.cartLogo}>
                <Link to="/cart">
                  <img src={cart} alt="cart icon" />
                  {/* <span>5</span> */}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </LoadingContainer>
    </div>
  );
};

export default Navbar;
