import React, { useContext, useState, useEffect } from "react";
import { BlogContext } from "../Context/BlogContext";
import "./UserPanel.css";
import { Link } from "react-router-dom";
const UserPanel = () => {
  const { valueOne, valueFour, valueSix } = useContext(BlogContext);
  const [blogs] = valueOne;

  const [useremail] = valueFour;

  const [favorites] = valueSix;

  const [avatar, setAvatar] = useState(null);
  const [mypostLength, setmypostLength] = useState(0);
  const [myfavLength, setmyfavLength] = useState(0);

  useEffect(() => {
    const checkuserAndPost = () => {
      let favK = favorites.find((el) => {
        return el.id === useremail;
      });
      const avatar = { ...favK };
      setAvatar(avatar.avatar);
    };
    checkuserAndPost();
  }, [blogs, favorites, useremail, setAvatar]);

  useEffect(() => {
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
    findLength();
  }, [favorites, blogs, useremail]);

  return (
    <div className="userPanel">
      {avatar && <img src={avatar} alt={avatar} />}
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to="userfavorites/"
      >
        <p>My Favorite Posts{myfavLength} </p>
      </Link>
      <Link style={{ textDecoration: "none", color: "black" }} to="settings/">
        <p>Settings</p>
      </Link>
      <Link style={{ textDecoration: "none", color: "black" }} to="myposts/">
        <p>My Posts {mypostLength.length}</p>
      </Link>
    </div>
  );
};

export default UserPanel;
