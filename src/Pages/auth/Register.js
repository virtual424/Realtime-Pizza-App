import React from "react";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import useInput from "../../hooks/Input";

const Register = () => {
  const {
    enteredInput: enteredName,
    inputChangeHandler: nameChangeHandler,
    blurChangeHandler: nameBlurHandler,
    hasError: nameHasError,
    resetInput: resetName,
    isValid: nameIsValid,
    errorType: nameErrorType,
  } = useInput(/^[a-zA-Z ]+$/); // eslint-disable-line

  const {
    enteredInput: enteredPassword,
    inputChangeHandler: passwordChangeHandler,
    blurChangeHandler: passwordBlurHandler,
    hasError: passwordHasError,
    resetInput: resetPassword,
    isValid: passwordIsValid,
    errorType: passwordErrorType,
  } = useInput(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/); // eslint-disable-line

  const {
    enteredInput: enteredConfirmPassword,
    inputChangeHandler: confirmPasswordChangeHandler,
    blurChangeHandler: confirmPasswordBlurHandler,
    hasError: confirmPasswordHasError,
    resetInput: resetConfirmPassword,
    isValid: confirmPasswordIsValid,
    errorType: confirmPasswordErrorType,
  } = useInput(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/); // eslint-disable-line

  const invalidClassName = nameHasError
    ? `${styles.input} ${styles.invalid}`
    : `${styles.input}`;

  const invalidClassPassword = passwordHasError
    ? `${styles.input} ${styles.invalid}`
    : `${styles.input}`;
  const invalidClassConfirmPassword = confirmPasswordHasError
    ? `${styles.input} ${styles.invalid}`
    : `${styles.input}`;

  let nameErrorText;
  let passwordErrorText;
  let confirmPasswordErrorText;

  if (nameHasError) {
    if (nameErrorType === "EMPTY") nameErrorText = "Please Enter a name";
    else if (nameErrorType === "INVALID")
      nameErrorText = "Please Enter a Valid Name";
  }
  if (passwordHasError) {
    if (passwordErrorType === "EMPTY")
      passwordErrorText = "Please Enter a password";
    else if (passwordErrorType === "INVALID")
      passwordErrorText =
        "Password should contain uppercase,lowercase,special characters, and digits 0-9";
  }
  if (confirmPasswordHasError) {
    if (confirmPasswordErrorType === "EMPTY")
      confirmPasswordErrorText = "Please Enter a password";
    else if (confirmPasswordErrorType === "INVALID")
      confirmPasswordErrorText = "Passwords do not match";
  }

  return (
    <div className={styles.register}>
      <Card className={styles.registerCard}>
        <form className={styles.registerForm}>
          <label htmlFor="username">Name</label>
          <Input
            className={invalidClassName}
            type="text"
            placeholder="Your Name"
            value={enteredName}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameHasError && <p className={styles.errorText}>{nameErrorText}</p>}
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

          <label htmlFor="confirm password">Confirm Password</label>
          <Input
            className={invalidClassConfirmPassword}
            type="password"
            placeholder="Re-enter password"
            value={enteredConfirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
          />
          {confirmPasswordHasError && (
            <p className={styles.errorText}>{confirmPasswordErrorText}</p>
          )}

          <div className={styles.container}>
            <Button content="Register" path="" className={styles.button} />
            <Link to="/login">Already have an account ?</Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Register;
