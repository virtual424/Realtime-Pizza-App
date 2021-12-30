import React from "react";
import MenuCard from "./MenuCard";
import styles from "./MenuSection.module.css";

const MenuSection = ({ menu }) => {
  return (
    <>
      <div className={styles.menuSection}>
        <h2 className={styles.pageTitle}>All Pizzas</h2>
        <div className={styles.allPizzasContainer}>
          {menu.map((menuData) => (
            <MenuCard menuData={menuData} key={menuData.id} id={menuData.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MenuSection;
