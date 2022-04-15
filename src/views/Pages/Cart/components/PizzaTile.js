import React from "react";
import styles from "./PizzaTile.module.css";
import pizzaIcon from "../../../assets/img/pizza.png";

const PizzaTile = ({ cartData }) => {
  return (
    <div className={styles.pizzaTile}>
      <img src={pizzaIcon} alt="pizzaIcon" />
      <div className={styles.left}>
        <h4>{cartData.Name}</h4>
        <span>{cartData.size}</span>
      </div>
      <span className={styles.quantity}>{`${cartData.Quantity} pcs`}</span>
      <span className={styles.price}>{`${cartData.Price} Rs`}</span>
    </div>
  );
};

export default PizzaTile;
