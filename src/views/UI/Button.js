import React from "react";
import styles from "./Button.module.css";

const Button = ({ content, className, onClick }) => {
  return (
    <div className={`${styles.btn} ${className}`}>
      <button className={styles.link} onClick={onClick}>
        {content}
      </button>
    </div>
  );
};

export default Button;
