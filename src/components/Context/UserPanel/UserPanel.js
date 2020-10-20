import React, { useContext, useState, useEffect } from "react";
import { BlogContext } from "../Context/BlogContext";
import "./UserPanel.css";
import { ImExit } from "react-icons/im";

import { AiOutlineSetting } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebase";
const UserPanel = () => {
  const {
    valueOne,
    valueTwo,
    valueThree,
    valueFour,
    valueSix,
    valueEight,
  } = useContext(BlogContext);
  const [blogs] = valueOne;

  const [useremail] = valueFour;

  const [favorites] = valueSix;
  const [toggle, setToggle] = valueEight;
  const noimage = require("../../../images/115-1150152_default-profile-picture-avatar-png-green.png");
  const [avatar, setAvatar] = useState(null);
  const [mypostLength, setmypostLength] = useState(0);
  const [myfavLength, setmyfavLength] = useState(0);
  const [, setloggedIn] = valueTwo;
  const [, setuserId] = valueThree;
  const navigate = useNavigate();
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

  const signOut = (e) => {
    e.preventDefault();
    setuserId(null);
    setloggedIn(false);
    auth.signOut();
    navigate("/");
  };

  return (
    <div className="userPanel">
      <div className="imgLoggedAs">
        <p>
          Logged as:{" "}
          <Link
            onClick={() => setToggle(!toggle)}
            to={`/user/${useremail}`}
            // state={object}
            style={{ textDecoration: "none", color: "green" }}
          >
            {" "}
            {useremail}
          </Link>
        </p>
        {avatar ? (
          <img src={avatar} alt={avatar} />
        ) : (
          <img src={noimage} alt={noimage} />
        )}
      </div>
      <div className="menuUserBar">
        <Link
          onClick={() => setToggle(!toggle)}
          style={{ textDecoration: "none", color: "black" }}
          to="userfavorites/"
        >
          <p>My Favorite Posts: {myfavLength} </p>
        </Link>

        <Link
          onClick={() => setToggle(!toggle)}
          style={{ textDecoration: "none", color: "black" }}
          to="myposts/"
        >
          <p>My Posts: {mypostLength.length}</p>
        </Link>
        <Link
          onClick={() => setToggle(!toggle)}
          style={{ textDecoration: "none", color: "black" }}
          to="settings/"
        >
          <p>
            Settings <AiOutlineSetting />
          </p>
        </Link>
      </div>

      <span
        onClick={signOut}
        style={{ marginBottom: "5px", float: "right", color: "#d63030" }}
      >
        <ImExit /> Sign Out
      </span>
    </div>
  );
};

export default UserPanel;
