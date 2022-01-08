import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AddPizzaModal.module.css";
import pizzaIcon from "../../assets/img/pizza.png";
import Button2 from "../UI/Button2";
import Backdrop from "../UI/Backdrop";
import Input from "../UI/Input";
import { uiActions } from "../../../store/reducers/uiSlice";
import { addPizza, editPizza } from "../../../store/actions/Menu";
import { menuActions } from "../../../store/reducers/menuSlice";

const AddPizzaModal = () => {
  const titleRef = useRef();
  const sizeRef = useRef();
  const priceRef = useRef();
  const dispatch = useDispatch();
  const { Title, Price, Size, edit, editId } = useSelector(
    (state) => state.menuReducer.editData
  );

  const addPizzaHandler = () => {
    const enteredName = titleRef.current.value.trim();
    const enteredSize = sizeRef.current.value.trim();
    const enteredPrice = priceRef.current.value.trim();

    if (
      [enteredName, enteredPrice, enteredSize].every(
        (input) => input.length !== 0
      )
    ) {
      if (edit) {
        dispatch(
          editPizza({
            menu: {
              Name: enteredName,
              Price: enteredPrice,
              Size: enteredSize,
            },
            menuId: editId,
          })
        );
      } else {
        dispatch(
          addPizza({
            Name: enteredName,
            Price: enteredPrice,
            Size: enteredSize,
          })
        );
      }
      closePizzaModalHandler();
    }
  };

  const closePizzaModalHandler = () => {
    dispatch(menuActions.closeModal());
  };

  const content = (
    <div className={styles.menuCard}>
      <img src={pizzaIcon} alt="pizza-icon" />
      <div className={styles.pizzaInfo}>
        <label htmlFor="pizza-title">Pizza title</label>
        <Input placeholder="Enter title" ref={titleRef} defaultValue={Title} />
        <label htmlFor="pizza-title">Enter size</label>
        <Input placeholder="Size" ref={sizeRef} defaultValue={Size} />
        <label htmlFor="pizza-title">Price</label>
        <Input placeholder="Price" ref={priceRef} defaultValue={Price} />
        <div className={styles.control}>
          <Button2 content="Add" onClickHandler={addPizzaHandler} />
          <Button2 content="Close" onClickHandler={closePizzaModalHandler} />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {ReactDOM.createPortal(content, document.getElementById("modal-root"))}
      {ReactDOM.createPortal(
        <Backdrop onCancel={closePizzaModalHandler} />,
        document.getElementById("backdrop-root")
      )}
    </>
  );
};

export default AddPizzaModal;
