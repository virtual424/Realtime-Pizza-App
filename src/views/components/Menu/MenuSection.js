import React from "react";
import MenuCard from "./MenuCard";
import styles from "./MenuSection.module.css";

const MenuSection = () => {
  return (
    <>
      <div className={styles.menuSection}>
        <h2 className={styles.pageTitle}>All Pizzas</h2>
        <div className={styles.allPizzasContainer}>
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
        </div>
      </div>
    </>
  );
};

export default MenuSection;
