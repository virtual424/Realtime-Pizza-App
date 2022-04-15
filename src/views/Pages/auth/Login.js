import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import useInput from "../../hooks/Input";
import { signIn } from "../../../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import LoadingContainer from "../../UI/LoadingContainer";

const Login = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.uiReducer.error);

  const {
    enteredInput: enteredEmail,
    inputChangeHandler: emailChangeHandler,
    blurChangeHandler: emailBlurHandler,
    hasError: emailHasError,
    isValid: emailIsValid,
    errorType: emailErrorType,
  } = useInput(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/); // eslint-disable-line

  const {
    enteredInput: enteredPassword,
    inputChangeHandler: passwordChangeHandler,
    blurChangeHandler: passwordBlurHandler,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    errorType: passwordErrorType,
  } = useInput(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/); // eslint-disable-line

  const invalidClassEmail = emailHasError
    ? `${styles.input} ${styles.invalid}`
    : `${styles.input}`;

  const invalidClassPassword = passwordHasError
    ? `${styles.input} ${styles.invalid}`
    : `${styles.input}`;

  let emailErrorText;
  let passwordErrorText;

  if (emailHasError) {
    if (emailErrorType === "EMPTY") emailErrorText = "Please Enter a email";
    else if (emailErrorType === "INVALID")
      emailErrorText = "Please Enter a Valid Email";
  }
  if (passwordHasError) {
    if (passwordErrorType === "EMPTY")
      passwordErrorText = "Please Enter a password";
    else if (passwordErrorType === "INVALID")
      passwordErrorText =
        "Password should contain uppercase,lowercase,special characters, and digits 0-9";
  }

  const loginHandler = (event) => {
    event.preventDefault();

    const entries = [enteredEmail, enteredPassword];
    const entriesEmpty = entries.every((element) => element.length === 0);
    const entriesValid = emailIsValid && passwordIsValid;

    if (!entriesEmpty && entriesValid) {
      dispatch(
        signIn({
          email: enteredEmail,
          password: enteredPassword,
        })
      );
    }
  };

  return (
    <div className={styles.login}>
      <Card className={styles.loginCard}>
        {error && (
          <div className={styles.errorDiv}>
            <p>{error}</p>
          </div>
        )}
        <form className={styles.loginForm}>
          <label htmlFor="email">Email</label>
          <Input
            className={invalidClassEmail}
            type="text"
            placeholder="Email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && (
            <p className={styles.errorText}>{emailErrorText}</p>
          )}

          <label htmlFor="password">Password</label>
          <Input
            className={invalidClassPassword}
            type="password"
            placeholder="Password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordHasError && (
            <p className={styles.errorText}>{passwordErrorText}</p>
          )}

          <LoadingContainer>
            <div className={styles.container}>
              <Button
                content="Login"
                className={styles.button}
                onClick={loginHandler}
              />
              <Link to="/register">Don't have an account ?</Link>
            </div>
          </LoadingContainer>
        </form>
      </Card>
    </div>
  );
};

export default Login;
