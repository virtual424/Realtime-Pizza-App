import React from "react";
import styles from "./HeroSection.module.css";
import pizza from "../../assets/img/hero-pizza.png";
import Button from "../UI/Button";

const HeroSection = () => {
  return (
    <div className={styles.heroSection}>
      <div className={styles.left}>
        <p>Are you hungry?</p>
        <h1>Don't Wait !</h1>
        <Button content="Order Now" path="/menu" />
      </div>
      <div className={styles.right}>
        <img src={pizza} alt="hero-pizza" />
      </div>
    </div>
  );
};

export default HeroSection;
