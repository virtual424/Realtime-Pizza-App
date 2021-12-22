import React from "react";
import styles from "./PizzaTile.module.css";
import pizzaIcon from "../../assets/img/pizza.png";

const PizzaTile = () => {
  return (
    <div className={styles.pizzaTile}>
      <img src={pizzaIcon} alt="pizzaIcon" />
      <div className={styles.left}>
        <h4>Marinara</h4>
        <span>MEDIUM</span>
      </div>
      <span className={styles.quantity}>1 Pcs</span>
      <span className={styles.price}>300 Rs</span>
    </div>
  );
};

export default PizzaTile;
