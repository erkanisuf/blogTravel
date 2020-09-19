import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BlogContext } from "./BlogContext";
import "./PostDetail.css";
import { ImHeart } from "react-icons/im";
import { db } from "../../firebase/firebase";
import { Link } from "react-router-dom";

const Detail = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const dataRouter = id;

  console.log("routt", dataRouter);

  const navigate = useNavigate();
  const { valueOne, valueTwo, valueThree, valueFour } = useContext(BlogContext);
  const [blogs] = valueOne;
  const patka = blogs.find((el) => el.id === dataRouter);
  console.log("patka", patka.name);
  const [userId] = valueThree;
  const [useremail] = valueFour;
  const [loggedIn] = valueTwo;
  const [btnFill, setBtnFill] = useState(null);

  useEffect(() => {
    const commentBox = require("commentbox.io");
    commentBox("5667082964303872-proj");
  }, []);

  const filltheButton = () => {
    if (patka.likes.find((el) => el === useremail)) {
      setBtnFill(false);
      return false;
    } else {
      setBtnFill(true);
    }
  };

  useEffect(() => {
    filltheButton();
  });

  const upVotebtnPost = () => {
    const copyArrPost = { ...patka };

    if (loggedIn) {
      const pushArray = copyArrPost.likes;

      if (copyArrPost.likes.find((el) => el === useremail)) {
        alert("same cant upvote anymore bich");
        setBtnFill(false);
        return false;
      } else {
        setBtnFill(true);
        pushArray.push(useremail);
        writeUserData(patka.id, pushArray);
      }
    } else {
      alert("only registered can vote");
    }
  };

  function writeUserData(id, sendObj) {
    db.collection("times").doc(id).update({
      likes: sendObj,
    });
  }

  return (
    <>
      <Link to={"/"}>
        <button>GO BACK</button>
      </Link>
      <div className="containerPostDetail">
        <div className="titleheader">
          <h1>{patka.title}</h1>
          <h5>{patka.name}</h5>
          <img src={patka.image} alt={patka.name} />
        </div>

        <div
          className="themaintext"
          dangerouslySetInnerHTML={{ __html: patka.text }}
        ></div>

        <div className="btnandcomment">
          <p>{patka.likes.length}</p>
          {loggedIn ? (
            <button
              className={btnFill ? "btnopen" : "btnclosed"}
              onClick={upVotebtnPost}
            >
              <ImHeart />
            </button>
          ) : (
            "Log in to Vote"
          )}
        </div>
        <div className="commentbox" id={`${patka.id}`} />
      </div>
      ))
    </>
  );
};

export default Detail;
