import React from "react";
import styles from "./HeroSection.module.css";
import pizza from "../../assets/img/hero-pizza.png";
import Button from "../UI/Button";
import { useSelector } from "react-redux";

const HeroSection = () => {
  const user = useSelector((state) => state.authReducer.user);

  return (
    <div className={styles.heroSection}>
      <div className={styles.left}>
        <p>Are you hungry?</p>
        <h1>Don't Wait !</h1>
        {user && <Button content="Order now" path="/menu" />}
        {!user && <Button content="Register now" path="/register" />}
      </div>
      <div className={styles.right}>
        <img src={pizza} alt="hero-pizza" />
      </div>
    </div>
  );
};

export default HeroSection;
