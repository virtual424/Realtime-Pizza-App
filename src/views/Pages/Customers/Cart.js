import React, { useRef } from "react";
import styles from "./Cart.module.css";
import mtCart from "../../assets/img/empty-cart.png";
import Button from "../../components/UI/Button";
import { useSelector, useDispatch } from "react-redux";
import cartIcon from "../../assets/img/cart-black.png";
import PizzaTile from "../../components/cart/PizzaTile.js";
import { createOrder } from "../../../store/actions/Order";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartState = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();

  const createOrderHandler = (event) => {
    event.preventDefault();
    const enteredAdd = inputRef.current.value.trim();
    if (enteredAdd.length !== 0) {
      dispatch(createOrder({ cartState, address: enteredAdd }));
      navigate("/order");
    }
  };

  return (
    <div className={styles.cart}>
      {cartState.cart.length === 0 && (
        <div className={styles.emptyCart}>
          <h2>Cart Empty 😕 </h2>
          <p>
            You probably haven't added a pizza yet. <br /> To order a pizza, go
            to the main page.
          </p>
          <img src={mtCart} alt="emptyCart" />
          <br />
          <Button content="Go Back" path="" />
        </div>
      )}
      {cartState.cart.length !== 0 && (
        <div className={styles.orderContainer}>
          <div className={styles.orderContainerHeader}>
            <img src={cartIcon} alt="cartIcon" />
            <h3>Order summary</h3>
          </div>
          <div className={styles.pizzaList}>
            {cartState.cart.map((item) => (
              <PizzaTile cartData={item} key={item.id} id={item.id} />
            ))}
          </div>
          <div className={styles.priceContainer}>
            <div className={styles.amountText}>
              <span className={styles.totalAmount}>Total Amount:</span>
              <span className={styles.priceText}>
                {cartState.totalAmount} Rs
              </span>
            </div>
            <form action="submit">
              <input type="text" placeholder="Address" ref={inputRef} />
              <div>
                <Button content="Order now" onClick={createOrderHandler} />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
