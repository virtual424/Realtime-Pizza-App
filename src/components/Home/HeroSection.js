import React from "react";
import styles from "./HeroSection.module.css";
import pizza from "../../assets/img/hero-pizza.png";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingContainer from "../UI/LoadingContainer";

const HeroSection = () => {
  const user = useSelector((state) => state.userReducer.user);
  const navigate = useNavigate();

  const btnContent = user ? "Order now" : "Register now";
  const onClickHandler = user
    ? () => navigate("/menu")
    : () => navigate("/register");

  return (
    <div className={styles.heroSection}>
      <div className={styles.left}>
        <p>Are you hungry?</p>
        <h1>Don't Wait !</h1>
        <LoadingContainer>
          <Button content={btnContent} onClick={onClickHandler} />
        </LoadingContainer>
      </div>
      <div className={styles.right}>
        <img src={pizza} alt="hero-pizza" />
      </div>
    </div>
  );
};

export default HeroSection;
