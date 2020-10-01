import React, { useState } from "react";
import { db } from "../../../firebase/firebase";
import firebase from "firebase";

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
    };
    db.collection("blogpost")
      .doc(copyofBlogsArrDetail.id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(commentUser),
      });
  };
  ///////////////////////UPDATES FIREBAS EARRAY

  return (
    <div>
      {copyofBlogsArrDetail.comments.length > 0
        ? copyofBlogsArrDetail.comments.map((key, index) => {
            return (
              <div key={index}>
                <img src={key.avatar} alt={index} />
                <p>{key.text}</p>
                <p>{key.email}</p>
              </div>
            );
          })
        : "No comments yet, Be the firs to comment"}
      {loggedIn ? (
        <div>
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
