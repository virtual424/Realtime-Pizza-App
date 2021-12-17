import React from "react";
import styles from "./Button.module.css";
import { Link } from "react-router-dom";

const Button = ({ content, path, className, onClick }) => {
  return (
    <div className={`${styles.btn} ${className}`}>
      <Link className={styles.link} to={path} onClick={onClick}>
        {content}
      </Link>
    </div>
  );
};

export default Button;
