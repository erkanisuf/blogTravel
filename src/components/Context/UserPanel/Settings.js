import React, { useContext, useState } from "react";
import { BlogContext } from "../Context/BlogContext";
import UserImage from "./UserImage";

const UserPanel = () => {
  const { valueOne, valueFour, valueSix } = useContext(BlogContext);
  const [blogs] = valueOne;
  const [useremail] = valueFour;
  const [favorites] = valueSix;
  const [avatar, setAvatar] = useState(null);

  return (
    <div>
      <h1>Settings</h1>
      {avatar && <img src={avatar} alt={avatar} />}
      <UserImage
        useremail={useremail}
        favorites={favorites}
        setAvatar={setAvatar}
        blogs={blogs}
      />
    </div>
  );
};

export default UserPanel;
