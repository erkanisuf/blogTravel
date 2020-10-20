import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../firebase/firebase";
import { FaUser } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import firebase from "firebase";
import { FaRegComment } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import Moment from "react-moment";
import "./MyPost.css";
import { BlogContext } from "../Context/BlogContext";
const UserPanel = () => {
  const { valueOne, valueFour } = useContext(BlogContext);
  const [blogs] = valueOne;

  const [useremail] = valueFour;
  const mypost = blogs.filter((el) => {
    return el.useremail === useremail;
  });

  // const fintmyAcc = favorites.filter((el) => {
  //   return el.id === useremail;
  // });
  // console.log(fintmyAcc[0], "findac");

  const deletePost = (e) => {
    console.log(e);
    db.collection("blogpost").doc(e.id).delete();

    db.collection("Users")
      .doc(useremail)
      .update({
        myPost: firebase.firestore.FieldValue.arrayRemove(e.id),
      });
  };

  return (
    <div className="ContainerAllPost">
      <h1>My Posts</h1>
      <div className="flexAllPost">
        {mypost.length > 0
          ? mypost.map((key, index) => {
              return (
                <div key={key.id} className="flexPosts">
                  <Link
                    key={index}
                    to={`/detail/${key.id}`}
                    state={key}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div className="flexuserDate">
                      <span>
                        <FaUser />
                        {key.useremail}
                      </span>
                      <Moment format="YYYY/MM/DD">{key.date}</Moment>
                    </div>

                    <div className="theimgCOnt">
                      <img src={key.image} alt={key.image} />
                      <div className="flexImgTitle">
                        <h1 style={{ color: "#538d22" }}>{key.title}</h1>

                        <div
                          className="shortText"
                          dangerouslySetInnerHTML={{ __html: key.text }}
                        ></div>
                      </div>
                    </div>

                    <div className="flexLikesComments">
                      <span style={{ color: "#538d22" }}>
                        <AiFillHeart />
                        {key.likes.length}
                      </span>
                      <span style={{ color: "#538d22" }}>
                        <FaRegComment />
                        {key.comments.length}
                      </span>
                    </div>
                  </Link>
                  <div className="deleteandEdit ">
                    <button
                      className="dltbtn"
                      onClick={() => {
                        deletePost(key);
                      }}
                    >
                      delete
                      <AiFillDelete />
                    </button>
                    <Link
                      to={`/detail/${key.id}/editpost/`}
                      state={key}
                      style={{ textDecoration: "none" }}
                    >
                      <button className="edtbtn">
                        Edit
                        <FaEdit />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })
          : "You havent shared story yet"}
      </div>
    </div>
  );
};

export default UserPanel;
