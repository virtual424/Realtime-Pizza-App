import React from "react";
import styles from "./MenuCard.module.css";
import pizzaIcon from "../../assets/img/pizza.png";
import Button2 from "../UI/Button2";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, getCart } from "../../../store/actions/cart";

const MenuCard = ({ menuData, id }) => {
  const user = useSelector((state) => state.userReducer.user);
  const btnContent = user.type === "Admin" ? "" : "+ Add";
  const menu = useSelector((state) => state.menuReducer.menu);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    const menuItem = menu.filter((item) => item.id === id)[0];
    dispatch(addToCart(menuItem));
  };

  return (
    <div className={styles.menuCard}>
      <img src={pizzaIcon} alt="" />
      <div className={styles.pizzaInfo}>
        <p className={styles.pizzaTitle}>{menuData.Name}</p>
        <span className={styles.size}>{menuData.Size}</span>
        <div className={styles.pricingContainer}>
          <p>{`${menuData.Price} Rs`}</p>
          <Button2 content={btnContent} onClickHandler={addToCartHandler} />
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
