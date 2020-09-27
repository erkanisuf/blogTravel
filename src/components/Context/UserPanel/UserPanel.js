import React, { useContext, useState } from "react";
import { BlogContext } from "../Context/BlogContext";
import UserImage from "./UserImage";
import UserFavorites from "./UserFavorites";
import MyPost from "./MyPost";

const UserPanel = () => {
  const { valueOne, valueFour, valueSix } = useContext(BlogContext);
  const [blogs] = valueOne;

  const [useremail] = valueFour;

  const [favorites] = valueSix;

  const [myFavs, setmyFavs] = useState([]);
  const [avatar, setAvatar] = useState(null);

  return (
    <div>
      {avatar && <img src={avatar} alt={avatar} />}
      <UserFavorites
        myFavs={myFavs}
        favorites={favorites}
        useremail={useremail}
        blogs={blogs}
        setmyFavs={setmyFavs}
      />
      <UserImage
        useremail={useremail}
        favorites={favorites}
        setAvatar={setAvatar}
        blogs={blogs}
      />
      <MyPost useremail={useremail} blogs={blogs} />
    </div>
  );
};

export default UserPanel;
