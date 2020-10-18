import React, { useState } from "react";
import { db } from "../../../firebase/firebase";
import firebase from "firebase";
import "./Comment.css";
import Moment from "react-moment";

const Comment = ({ copyofBlogsArrDetail, useremail, avatar, loggedIn }) => {
  const [textareavalue, settextareavalue] = useState("");
  console.log(textareavalue);
  const textareahandleChange = (e) => {
    settextareavalue(e.target.value);
  };

  const sendToFireBase = () => {
    const commentUser = {
      text: textareavalue,
      email: useremail,
      date: new Date().toISOString(),
      avatar: avatar,
      postId: copyofBlogsArrDetail.id,
    };
    db.collection("blogpost")
      .doc(copyofBlogsArrDetail.id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(commentUser),
      });
    addtoUserComments(commentUser);
  };

  const addtoUserComments = (param) => {
    firebase
      .firestore()
      .collection("Users")
      .doc(useremail)
      .update({
        myComments: firebase.firestore.FieldValue.arrayUnion(param),
      });
  };
  ///////////////////////UPDATES FIREBAS EARRAY

  return (
    <div className="CommentBox">
      {copyofBlogsArrDetail.comments.length > 0
        ? copyofBlogsArrDetail.comments.map((key, index) => {
            return (
              <div className="thecommentS" key={index}>
                <img src={key.avatar} alt={index} />
                <div>
                  <span
                    style={{
                      fontStyle: "italic",
                      color: "rgba(133, 133, 133, 0.9)",
                    }}
                  >
                    {key.email}
                  </span>
                  {key.email === useremail ? "edit" : "Cant edit"}
                  <Moment
                    style={{
                      float: "right",
                      fontStyle: "italic",
                      color: "rgba(133, 133, 133, 0.9)",
                    }}
                    format="YYYY/MM/DD"
                  >
                    {key.date}
                  </Moment>
                  <p>{key.text}</p>
                </div>
              </div>
            );
          })
        : "No comments yet, Be the firs to comment"}
      {loggedIn ? (
        <div className="writeComment">
          <label>Text Area</label>
          <textarea
            name="textarea"
            value={textareavalue}
            onChange={textareahandleChange}
          />
          <button type="submit" onClick={sendToFireBase}>
            Comment
          </button>
        </div>
      ) : (
        "Log in To Comment"
      )}
    </div>
  );
};

export default Comment;
