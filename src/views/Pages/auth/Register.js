import React, { useState } from "react";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import useInput from "../../hooks/Input";
import { signUp } from "../../../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/reducers/uiSlice";
import LoadingContainer from "../../UI/LoadingContainer";

const Register = () => {
  const [userType, setUserType] = useState("Admin");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.uiReducer.error);

  const {
    enteredInput: enteredName,
    inputChangeHandler: nameChangeHandler,
    blurChangeHandler: nameBlurHandler,
    hasError: nameHasError,
    isValid: nameIsValid,
    errorType: nameErrorType,
  } = useInput(/^[a-zA-Z ]+$/);

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

  const {
    enteredInput: enteredConfirmPassword,
    inputChangeHandler: confirmPasswordChangeHandler,
    blurChangeHandler: confirmPasswordBlurHandler,
    hasError: confirmPasswordHasError,
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

  const registerHandler = (event) => {
    event.preventDefault();

    const entries = [
      enteredName,
      enteredEmail,
      enteredPassword,
      enteredConfirmPassword,
    ];

    const entriesEmpty = entries.every((element) => element.length === 0);

    if (enteredPassword !== enteredConfirmPassword) {
      return dispatch(
        uiActions.setError({ message: "Passwords do not match" })
      );
    }

    const entriesValid =
      nameIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid;

    if (!entriesEmpty && entriesValid) {
      dispatch(
        signUp({
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword,
          type: userType,
        })
      );
    }
  };

  return (
    <div className={styles.register}>
      <Card className={styles.registerCard}>
        {error && (
          <div className={styles.errorDiv}>
            <p>{error}</p>
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

          <LoadingContainer>
            <div className={styles.container}>
              <Button
                content="Register"
                className={styles.button}
                onClick={registerHandler}
              />
              <Link to="/login">Already have an account ?</Link>
            </div>
          </LoadingContainer>
        </form>
      </Card>
    </div>
  );
};

export default Register;
