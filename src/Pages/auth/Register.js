import React, { useState } from "react";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import useInput from "../../hooks/Input";
import { signup, authActions } from "../../store/authSlice";
import { uiActions } from "../../store/uiSlice";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const [userType, setUserType] = useState("Admin");
  const dispatch = useDispatch();
  const customError = useSelector((state) => state.uiReducer.error);
  const error = useSelector((state) => state.authReducer.error);

  let errorMessage;
  if (customError) {
    errorMessage = customError;
  } else {
    errorMessage = error;
  }

  const {
    enteredInput: enteredName,
    inputChangeHandler: nameChangeHandler,
    blurChangeHandler: nameBlurHandler,
    hasError: nameHasError,
    resetInput: resetName,
    isValid: nameIsValid,
    errorType: nameErrorType,
  } = useInput(/^[a-zA-Z ]+$/);

  const {
    enteredInput: enteredEmail,
    inputChangeHandler: emailChangeHandler,
    blurChangeHandler: emailBlurHandler,
    hasError: emailHasError,
    resetInput: resetEmail,
    isValid: emailIsValid,
    errorType: emailErrorType,
  } = useInput(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/); // eslint-disable-line

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
  const invalidClassEmail = emailHasError
    ? `${styles.input} ${styles.invalid}`
    : `${styles.input}`;

  const invalidClassPassword = passwordHasError
    ? `${styles.input} ${styles.invalid}`
    : `${styles.input}`;
  const invalidClassConfirmPassword = confirmPasswordHasError
    ? `${styles.input} ${styles.invalid}`
    : `${styles.input}`;

  let nameErrorText;
  let emailErrorText;
  let passwordErrorText;
  let confirmPasswordErrorText;

  if (nameHasError) {
    if (nameErrorType === "EMPTY") nameErrorText = "Please Enter a name";
    else if (nameErrorType === "INVALID")
      nameErrorText = "Please Enter a Valid Name";
  }
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
  if (confirmPasswordHasError) {
    if (confirmPasswordErrorType === "EMPTY")
      confirmPasswordErrorText = "Please Enter a password";
    else if (confirmPasswordErrorType === "INVALID")
      confirmPasswordErrorText = "Please Enter a valid password";
  }

  const registerHandler = () => {
    const entries = [
      enteredName,
      enteredEmail,
      enteredPassword,
      enteredConfirmPassword,
    ];

    const entriesEmpty = entries.every((element) => element.length === 0);

    if (enteredPassword !== enteredConfirmPassword) {
      dispatch(uiActions.setError({ errorMessage: "Passwords do not match" }));
      return;
    }

    const entriesValid =
      nameIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid;

    if (!entriesEmpty && entriesValid) {
      dispatch(
        signup({
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword,
          userType: userType,
        })
      );
      resetName();
      resetEmail();
      resetPassword();
      resetConfirmPassword();
      dispatch(uiActions.setError({ errorMessage: "" }));
      dispatch(authActions.setError({ errorMessage: "" }));
    }
  };

  return (
    <div className={styles.register}>
      <Card className={styles.registerCard}>
        {errorMessage && (
          <div className={styles.errorDiv}>
            <p>{errorMessage}</p>
          </div>
        )}
        <form className={styles.registerForm}>
          <label htmlFor="name">Name</label>
          <Input
            className={invalidClassName}
            type="text"
            placeholder="Username"
            value={enteredName}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameHasError && <p className={styles.errorText}>{nameErrorText}</p>}
          <label htmlFor="email">Email</label>
          <Input
            className={invalidClassEmail}
            type="text"
            placeholder="Your Email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && (
            <p className={styles.errorText}>{emailErrorText}</p>
          )}
          <div className={styles.userType}>
            <label htmlFor="userType">Who are you ?</label>
            <select
              name="userType"
              onChange={(event) => setUserType(event.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
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
            <Button
              content="Register"
              path=""
              className={styles.button}
              onClick={registerHandler}
            />
            <Link to="/login">Already have an account ?</Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Register;
