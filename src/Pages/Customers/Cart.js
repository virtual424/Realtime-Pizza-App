import React from "react";
import styles from "./Cart.module.css";
import mtCart from "../../assets/img/empty-cart.png";
import Button from "../../components/UI/Button";
import cartIcon from "../../assets/img/cart-black.png";
import PizzaTile from "../../components/cart/PizzaTile.js";

const Cart = () => {
  return (
    <div className={styles.cart}>
      {/* <div className={styles.emptyCart}>
        <h2>Cart Empty 😕 </h2>
        <p>
          You probably haven't added a pizza yet. <br /> To order a pizza, go to
          the main page.
        </p>
        <img src={mtCart} alt="emptyCart" />
        <br />
        <Button content="Go Back" path="" />
      </div> */}
      <div className={styles.orderContainer}>
        <div className={styles.orderContainerHeader}>
          <img src={cartIcon} alt="cartIcon" />
          <h3>Order summary</h3>
        </div>
        <div className={styles.pizzaList}>
          <PizzaTile />
        </div>
        <div className={styles.priceContainer}>
          <div className={styles.amountText}>
            <span className={styles.totalAmount}>Total Amount:</span>
            <span className={styles.priceText}>300 Rs</span>
          </div>
          <form action="submit">
            <input type="text" placeholder="Address" />
            <div>
              <Button content="Order now" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
