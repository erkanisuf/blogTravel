import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BlogContext } from "../Context/BlogContext";
import "./PostDetail.css";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import firebase from "firebase";
import { db } from "../../../firebase/firebase";
import { FaUser } from "react-icons/fa";

import Comment from "../Comment/Comment";
import Moment from "react-moment";

const Detail = () => {
  const { id } = useParams();
  const dataRouter = id;

  const { valueOne, valueTwo, valueThree, valueFour, valueSix } = useContext(
    BlogContext
  );
  const [blogs] = valueOne;
  const [favorites] = valueSix;

  const copyofBlogsArrDetail = blogs.find((el) => el.id === dataRouter);

  const [userId] = valueThree;
  const [useremail] = valueFour;
  const [loggedIn] = valueTwo;
  const [btnFill, setBtnFill] = useState(null);
  const [logErr, setLogErr] = useState("");

  const [commentShow, setcommentShow] = useState(false);
  const [favFill, setfavFill] = useState(null);
  console.log(favFill);

  useEffect(() => {
    let findArrofFavs = favorites.find((el) => {
      return el.id === useremail;
    });
    if (findArrofFavs) {
      const copyofFindedEl = { ...findArrofFavs };
      const copyofFavPost = copyofFindedEl.favoritePost;
      const favpost = [...copyofFavPost];

      const result = favpost.find((el) => {
        return el === copyofBlogsArrDetail.id;
      });

      if (result) {
        console.log(result);
        setfavFill(true);
      } else {
        console.log("notinFavs");
        setfavFill(false);
      }
    }
  }, [favorites, useremail, copyofBlogsArrDetail]);

  useEffect(() => {
    setLogErr("");
  }, [copyofBlogsArrDetail]);

  const filltheButton = () => {
    if (copyofBlogsArrDetail.likes.find((el) => el === useremail)) {
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
    const copyArrPost = { ...copyofBlogsArrDetail };

    if (loggedIn) {
      const pushArray = copyArrPost.likes;

      if (copyArrPost.likes.find((el) => el === useremail)) {
        setLogErr("You can vote only once.");
        setBtnFill(false);
        return false;
      } else {
        setBtnFill(true);
        pushArray.push(useremail);
        writeUserData(copyofBlogsArrDetail.id, pushArray);
      }
    } else {
      setLogErr("Only registered can vote");
    }
  };

  function writeUserData(id, sendObj) {
    db.collection("blogpost").doc(id).update({
      likes: sendObj,
    });
  }

  const checkuserfavorites = () => {
    const erko = [...favorites];
    const engin = erko.find((el) => {
      return el.id === useremail;
    });

    if (engin) {
      let findArrofFavs = favorites.find((el) => {
        return el.id === useremail;
      });
      if (findArrofFavs) {
        const copyofFindedEl = { ...findArrofFavs };
        const copyofFavPost = copyofFindedEl.favoritePost;
        const favpost = [...copyofFavPost];

        const result = favpost.find((el) => {
          return el === copyofBlogsArrDetail.id;
        });

        if (result) {
          console.log(result);
          alert("already in favs");
        } else {
          console.log("notinFavs");
          const sanie = engin.favoritePost;
          sanie.push(copyofBlogsArrDetail.id);

          addtoFavorites(sanie);
        }
      }

      // const sanie = engin.favoritePost;
      // sanie.push(copyofBlogsArrDetail.id);

      // addtoFavorites(sanie);
    } else {
      firebase
        .firestore()
        .collection("favoritePost")
        .doc(useremail)
        .set({
          favoritePost: [copyofBlogsArrDetail.id],
          useremail: useremail,
          userid: userId,
        });
    }
  };

  const addtoFavorites = (param) => {
    firebase.firestore().collection("favoritePost").doc(useremail).set({
      favoritePost: param,
      useremail: useremail,
      userid: userId,
    });
  };

  return (
    <>
      <div className="containerPostDetail">
        <div className="titleheader">
          <h1>{copyofBlogsArrDetail.title}</h1>
          <span>
            <FaUser /> {"  "}
            {copyofBlogsArrDetail.name}
          </span>
          <span>
            <Moment format="YYYY/MM/DD">{copyofBlogsArrDetail.date}</Moment>
          </span>
          <span>{copyofBlogsArrDetail.useremail}</span>
        </div>
        <div className="imgheader">
          <img
            src={copyofBlogsArrDetail.image}
            alt={copyofBlogsArrDetail.name}
          />
        </div>

        <div
          className="themaintext"
          dangerouslySetInnerHTML={{ __html: copyofBlogsArrDetail.text }}
        ></div>

        <div className="btnandcomment">
          {loggedIn ? (
            <div>
              <span
                style={{
                  float: "right",
                  marginRight: "15px",
                  fontSize: "15px",
                }}
              >
                {copyofBlogsArrDetail.likes.length} Upvotes
                <p style={{ color: "red" }}>{logErr}</p>
              </span>
              <span
                className={btnFill ? "btnopen" : "btnclosed"}
                onClick={upVotebtnPost}
              >
                {btnFill ? <AiOutlineHeart /> : <AiFillHeart />}
              </span>
              <button
                style={{ backgroundColor: favFill ? "red" : "green" }}
                onClick={checkuserfavorites}
              >
                add to favorite
              </button>
            </div>
          ) : (
            <div>
              <span
                style={{
                  float: "right",
                  marginRight: "15px",
                  fontSize: "15px",
                }}
              >
                {copyofBlogsArrDetail.likes.length} Upvotes
                <p style={{ color: "red" }}>{logErr}</p>
              </span>

              <span
                style={{
                  float: "right",
                  marginRight: "5px",
                  fontSize: "25px",
                  cursor: "pointer",
                }}
                onClick={() => setLogErr("Log in To Vote..")}
              >
                <AiOutlineHeart />
              </span>
              <button
                onClick={() => setLogErr("Only registered can add to fav")}
              >
                add to favorite
              </button>
            </div>
          )}
          <span
            style={{
              float: "right",
              marginRight: "10px",
              fontSize: "22px",
              cursor: "pointer",
            }}
            onClick={() => setcommentShow(!commentShow)}
          >
            <FaRegComment />
          </span>

          {commentShow && <Comment commentId={copyofBlogsArrDetail.id} />}
        </div>
      </div>
    </>
  );
};

export default Detail;
