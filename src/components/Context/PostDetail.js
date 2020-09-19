import React, { useContext, useState, useEffect } from "react";
import { BlogContext } from "./BlogContext";
import "./PostDetail.css";
import { useLocation, useParams, useMatch } from "react-router-dom";
import { ImHeart } from "react-icons/im";
import { db } from "../../firebase/firebase";
import { Link } from "react-router-dom";

const PostDetail = () => {
  const { state } = useLocation();
  // const dataRouter = state;
  const dataRouter = {
    name: "gg",
    title: "gg",
    text: "gg",
    image: "gg",
    likes: ["gg"],
  };
  console.log(state);
  const { valueOne, valueTwo, valueThree, valueFive } = useContext(BlogContext);
  const [pardq, setPardq] = valueFive;
  const [blogs] = valueOne;
  const [userId] = valueThree;
  const [loggedIn] = valueTwo;
  const [btnFill, setBtnFill] = useState(null);

  useEffect(() => {
    const commentBox = require("commentbox.io");
    commentBox("5702429697900544-proj");
  }, [blogs]);

  const filltheButton = () => {
    if (blogs.find(isMatching).likes.find((el) => el === userId)) {
      setBtnFill(false);
      return false;
    } else {
      setBtnFill(true);
    }
  };

  useEffect(() => {
    filltheButton();
  });

  const isMatching = (objname) => {
    return objname.title === dataRouter.title;
  };

  const upVotebtnPost = () => {
    const copyArrPost = [...blogs];
    const likesArray = [...copyArrPost.find(isMatching).likes];
    if (loggedIn) {
      const sendObj = {
        image: copyArrPost.find(isMatching).image,
        name: copyArrPost.find(isMatching).name,
        pointEvents: copyArrPost.find(isMatching).pointEvents,
        text: copyArrPost.find(isMatching).text,
        title: copyArrPost.find(isMatching).title,
        upvotes: copyArrPost.find(isMatching).upvotes,
        likes: likesArray,
      };
      if (copyArrPost.find(isMatching).likes.find((el) => el === userId)) {
        alert("same cant upvote anymore bich");
        setBtnFill(false);
        return false;
      } else {
        setBtnFill(true);
        copyArrPost.find(isMatching).upvotes++;
        likesArray.push(userId);
        writeUserData(copyArrPost.find(isMatching).id, sendObj);
      }
    } else {
      alert("only registered can vote");
    }
  };

  function writeUserData(id, sendObj) {
    db.collection("times").doc(id).set(sendObj);
  }

  return (
    <>
      <Link to={"/"}>
        <button>GO BACK</button>
      </Link>

      <div className="containerPostDetail">
        <div className="titleheader">
          <h1>{blogs.find(isMatching).title}</h1>
          <h5>{blogs.find(isMatching).name}</h5>
          <img
            src={blogs.find(isMatching).image}
            alt={blogs.find(isMatching).name}
          />
        </div>

        <div
          className="themaintext"
          dangerouslySetInnerHTML={{ __html: blogs.find(isMatching).text }}
        ></div>

        <div className="btnandcomment">
          <p>{blogs.find(isMatching).likes.length}</p>
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
        <div className="commentbox" id={`${blogs.find(isMatching).name}`} />
      </div>
    </>
  );
};

export default PostDetail;
