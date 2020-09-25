import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BlogContext } from "./BlogContext";
import "./PostDetail.css";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

import { db } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

import Comment from "./Comment";
import Moment from "react-moment";

const Detail = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const dataRouter = id;

  const navigate = useNavigate();
  const { valueOne, valueTwo, valueThree, valueFour } = useContext(BlogContext);
  const [blogs] = valueOne;
  const detailBlogArr = blogs.find((el) => el.id === dataRouter);

  const [userId] = valueThree;
  const [useremail] = valueFour;
  const [loggedIn] = valueTwo;
  const [btnFill, setBtnFill] = useState(null);
  const [logErr, setLogErr] = useState("");
  const [commentShow, setcommentShow] = useState(false);

  useEffect(() => {
    setLogErr("");
  }, [detailBlogArr]);

  const filltheButton = () => {
    if (detailBlogArr.likes.find((el) => el === useremail)) {
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
    const copyArrPost = { ...detailBlogArr };

    if (loggedIn) {
      const pushArray = copyArrPost.likes;

      if (copyArrPost.likes.find((el) => el === useremail)) {
        setLogErr("You can vote only once.");
        setBtnFill(false);
        return false;
      } else {
        setBtnFill(true);
        pushArray.push(useremail);
        writeUserData(detailBlogArr.id, pushArray);
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
  console.log(detailBlogArr.date);

  return (
    <>
      <div className="containerPostDetail">
        <div className="titleheader">
          <h1>{detailBlogArr.title}</h1>
          <span>
            <FaUser /> {"  "}
            {detailBlogArr.name}
          </span>
          <span>
            <Moment format="YYYY/MM/DD">{detailBlogArr.date}</Moment>
          </span>
          <span>{detailBlogArr.useremail}</span>
        </div>
        <div className="imgheader">
          <img src={detailBlogArr.image} alt={detailBlogArr.name} />
        </div>

        <div
          className="themaintext"
          dangerouslySetInnerHTML={{ __html: detailBlogArr.text }}
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
                {detailBlogArr.likes.length} Upvotes
                <p style={{ color: "red" }}>{logErr}</p>
              </span>
              <span
                className={btnFill ? "btnopen" : "btnclosed"}
                onClick={upVotebtnPost}
              >
                {btnFill ? <AiOutlineHeart /> : <AiFillHeart />}
              </span>
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
                {detailBlogArr.likes.length} Upvotes
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

          {commentShow && <Comment commentId={detailBlogArr.id} />}
        </div>
      </div>
    </>
  );
};

export default Detail;
