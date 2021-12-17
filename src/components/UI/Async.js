import React from "react";
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";

const Async = (props) => {
  const status = useSelector((state) => state.authReducer.status);

  return status === "LOADING" ? (
    <CircularProgress style={{ color: props.color }} varient="indeterminate" />
  ) : (
    props.children
  );
};

export default Async;
