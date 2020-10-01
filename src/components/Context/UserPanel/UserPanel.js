import React, { useContext, useState, useEffect } from "react";
import { BlogContext } from "../Context/BlogContext";
import UserImage from "./UserImage";

import { Link } from "react-router-dom";
const UserPanel = () => {
  const { valueOne, valueFour, valueSix } = useContext(BlogContext);
  const [blogs] = valueOne;

  const [useremail] = valueFour;

  const [favorites] = valueSix;

  const [avatar, setAvatar] = useState(null);
  const [mypostLength, setmypostLength] = useState(0);
  const [myfavLength, setmyfavLength] = useState(0);

  const findLength = () => {
    const mypost = blogs.filter((el) => {
      return el.useremail === useremail;
    });
    setmypostLength(mypost);
    let favK = favorites.find((el) => {
      return el.id === useremail;
    });
    if (favK) {
      const copy = { ...favK };
      const tosetCopy = copy.favoritePost;
      setmyfavLength(tosetCopy.length);
    } else {
      console.log("not found user");
      setmyfavLength(0);
    }
  };
  useEffect(() => {
    findLength();
  }, [favorites, blogs, useremail]);

  return (
    <div>
      {avatar && <img src={avatar} alt={avatar} />}
      <Link to="userfavorites/">
        <p>My Favorite Posts{myfavLength} </p>
      </Link>
      <UserImage
        useremail={useremail}
        favorites={favorites}
        setAvatar={setAvatar}
        blogs={blogs}
      />
      <Link to="myposts/">
        <p>My Posts {mypostLength.length}</p>
      </Link>
    </div>
  );
};

export default UserPanel;
