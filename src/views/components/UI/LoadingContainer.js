import React from "react";
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";

const LoadingContainer = (props) => {
  const pending = useSelector((state) => state.uiReducer.pending);

  return pending === "IDLE" || pending ? (
    <CircularProgress
      style={{ color: props.color || "#fe5f1e" }}
      varient="indeterminate"
      size="30px"
    />
  ) : (
    props.children
  );
};

export default LoadingContainer;
