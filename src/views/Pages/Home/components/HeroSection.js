import styles from "./HeroSection.module.css";
import pizza from "../../../assets/img/hero-pizza.png";
import Button from "../../../UI/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingContainer from "../../../UI/LoadingContainer";

const HeroSection = () => {
  const user = useSelector((state) => state.userReducer.user);
  const navigate = useNavigate();

  const btnContent = user
    ? user.type === "Customer"
      ? "Order now"
      : "Check new Orders"
    : "Register now";
  const greetLabelContent = user
    ? `Welcome, ${user.name.split(" ")[0]}`
    : "Are you hungry?";
  const onClickHandler = user
    ? () => navigate("/menu")
    : () => navigate("/register");

  return (
    <div className={styles.heroSection}>
      <div className={styles.left}>
        <LoadingContainer>
          <p>{greetLabelContent}</p>
          <h1>Don't Wait !</h1>
          <Button
            content={btnContent}
            onClick={onClickHandler}
            className={styles.btn}
          />
        </LoadingContainer>
      </div>
      <div className={styles.right}>
        <img src={pizza} alt="hero-pizza" />
      </div>
    </div>
  );
};

export default HeroSection;
