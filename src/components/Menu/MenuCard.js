import React from "react";
import styles from "./MenuCard.module.css";
import pizzaIcon from "../../assets/img/pizza.png";
const MenuCard = () => {
  return (
    <div className={styles.menuCard}>
      <img src={pizzaIcon} alt="" />
      <div className={styles.pizzaInfo}>
        <p className={styles.pizzaTitle}>Margherita</p>
        <span className={styles.size}>SMALL</span>
        <div className={styles.pricingContainer}>
          <p>250 Rs</p>
          <button>
            <span>+</span>
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
