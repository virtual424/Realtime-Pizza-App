import React, { useEffect } from "react";
import { getMenu } from "../../../store/actions/Menu";
import { useDispatch } from "react-redux";
import MenuSection from "./MenuSection";

const MenuSectionContainer = ({ menu }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch]);

  return <MenuSection menu={menu} />;
};

export default MenuSectionContainer;
