import React from "react";
import styles from "./Button2.module.css";

const Button2 = ({ content, onClickHandler }) => {
  return (
    <button className={styles.button2} onClick={onClickHandler}>
      {content}
    </button>
  );
};

export default Button2;
