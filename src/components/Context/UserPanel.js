import React, { useContext, useState } from "react";
import { BlogContext } from "./BlogContext";

const UserPanel = () => {
  const { valueOne, valueThree, valueFour, valueSix } = useContext(BlogContext);
  const [blogs] = valueOne;
  const [useremail, setuserEmail] = valueFour;
  const [userid, setuserId] = valueThree;
  const [favorites, setfavorites] = valueSix;
  return <div></div>;
};

export default UserPanel;
