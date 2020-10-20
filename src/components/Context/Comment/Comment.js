import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebase";
import firebase from "firebase";
import "./Comment.css";
import Moment from "react-moment";
import uuid from "react-uuid";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
const Comment = ({
  copyofBlogsArrDetail,
  useremail,
  avatar,
  loggedIn,
  favorites,
}) => {
  const [updatecomments, setupdateComments] = useState(null);
  console.log("updatecoms", updatecomments);

  //TEXT area Edit when posting comment
  const [textareavalue, settextareavalue] = useState("");
  const textareahandleChange = (e) => {
    settextareavalue(e.target.value);
  };
  //Editing Comment

  const handleEditInput = (e, index) => {
    console.log(e.target.value);
    console.log(index);

    const update = [...updatecomments];
    update[index].text = e.target.value;
    setupdateComments(update);
  };

  useEffect(() => {
    setupdateComments(copyofBlogsArrDetail.comments);
  }, [copyofBlogsArrDetail.comments]);

  const sendToFireBase = () => {
    const commentUser = {
      text: textareavalue,
      email: useremail,
      date: new Date().toISOString(),
      avatar: avatar,
      postId: copyofBlogsArrDetail.id,
      uuid: uuid(),
    };
    db.collection("blogpost")
      .doc(copyofBlogsArrDetail.id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(commentUser),
      });
    addtoUserComments(commentUser);
    settextareavalue("");
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
  //update array of firebase

  const editTarget = (key, index) => {
    console.log(key);
    console.log(index);
    console.log(copyofBlogsArrDetail.comments[index]);
    const update = [...updatecomments];
    update[index].toggleEdit = true;
    setupdateComments(update);
    // settoggleEdit(!toggleEdit);
  };

  ///This One closes Edit mode of Comment
  const buttonOk = (key, index) => {
    const updateClose = [...updatecomments];
    updateClose[index].toggleEdit = false;
    updateClose[index].edited = new Date().toISOString();

    setupdateComments(updateClose);
    console.log(updateClose, "can i send");
    updateEditFireBaseComments(updateClose);
    updateUserMyCommentsFB();
  };
  const removeComment = (key, index) => {
    const updateClose = [...updatecomments];
    updateClose.splice(index, 1);

    console.log(updateClose, "del");
    updateEditFireBaseComments(updateClose);
    removeCommentFromUsersDB(index);
  };

  const removeCommentFromUsersDB = (index) => {
    const matchUser = favorites.find((el) => {
      return el.id === useremail;
    });

    const copyUsercomments = [...matchUser.myComments];
    const updateClose = [...updatecomments];
    const kur = copyUsercomments.find((el) => {
      return el.uuid === updateClose[index].uuid;
    });
    console.log("kur", kur);
    db.collection("Users")
      .doc(useremail)
      .update({
        myComments: firebase.firestore.FieldValue.arrayRemove(kur),
      });
  };

  //Updates Posts Edited Comment
  const updateEditFireBaseComments = (param) => {
    db.collection("blogpost").doc(copyofBlogsArrDetail.id).update({
      comments: param,
    });
  };

  const updateUserMyCommentsFB = () => {
    const theUser = favorites.find((el) => {
      return el.id === useremail;
    }); // Checks if Loged User and His Comments

    const updateClosez = [...copyofBlogsArrDetail.comments];
    // Coppy Comments of the Blog POst

    const findUserCommentUiFromBlogsUi = updateClosez.filter((el) => {
      return theUser.myComments.find((elz) => {
        return elz.uuid === el.uuid;
      });
    });
    // Finds all Comments in User Database that are also in Blog Post Data Base
    console.log(findUserCommentUiFromBlogsUi, "pardq");
    const copyOFallCOmments = theUser.myComments;
    console.log("copyAll", copyOFallCOmments);

    // Next For loop merges the comments based on uuid !
    let merged = [];

    for (let i = 0; i < copyOFallCOmments.length; i++) {
      merged.push({
        ...copyOFallCOmments[i],
        ...findUserCommentUiFromBlogsUi.find(
          (itmInner) => itmInner.uuid === copyOFallCOmments[i].uuid
        ),
      });
    }
    console.log(merged, "merged");
    const addtoUserComments = (param) => {
      firebase.firestore().collection("Users").doc(useremail).update({
        myComments: param,
      });
    };
    addtoUserComments(merged);
  };

  return (
    <div className="CommentBox">
      {copyofBlogsArrDetail.comments.length > 0
        ? copyofBlogsArrDetail.comments.map((key, index) => {
            return (
              <div className="thecommentS" key={index}>
                <Link
                  to={`/user/${key.email}`}
                  // state={object}
                  style={{
                    textDecoration: "none",
                    color: "rgba(133, 133, 133, 0.9)",
                  }}
                >
                  {" "}
                  <img src={key.avatar} alt={index} />
                </Link>
                <div>
                  <span
                    style={{
                      fontStyle: "italic",
                      color: "rgba(133, 133, 133, 0.9)",
                    }}
                  >
                    <Link
                      to={`/user/${key.email}`}
                      // state={object}
                      style={{
                        textDecoration: "none",
                        color: "rgba(133, 133, 133, 0.9)",
                      }}
                    >
                      {" "}
                      {key.email}
                    </Link>
                  </span>
                  {key.email === useremail ? (
                    <span>
                      <button
                        className="edtbtn"
                        onClick={() => editTarget(key, index)}
                      >
                        Edit <FaEdit />
                      </button>
                      <button
                        className="dltbtn"
                        onClick={() => removeComment(key, index)}
                      >
                        remove <AiFillDelete />
                      </button>
                    </span>
                  ) : (
                    ""
                  )}
                  <Moment
                    style={{
                      float: "right",
                      fontStyle: "italic",
                      color: "rgba(133, 133, 133, 0.9)",
                    }}
                    format="YYYY/MM/DD, h:mm:ss a"
                  >
                    {key.date}
                  </Moment>
                  <p>
                    {key.toggleEdit ? (
                      <span>
                        <input
                          className="editarea"
                          type="textarea"
                          value={key.text}
                          onChange={(e) => handleEditInput(e, index)}
                        />
                        <button
                          className="okbtn"
                          onClick={() => buttonOk(key, index)}
                        >
                          Ok
                        </button>
                      </span>
                    ) : (
                      key.text
                    )}
                  </p>
                  {key.edited ? (
                    <span>
                      <Moment
                        style={{
                          float: "right",
                          fontStyle: "italic",
                          color: "rgba(133, 133, 133, 0.9)",
                          fontSize: "13px",
                        }}
                        format="YYYY/MM/DD, h:mm:ss a"
                      >
                        {key.edited}
                      </Moment>
                      <span
                        style={{
                          float: "right",

                          fontStyle: "italic",
                          color: "rgba(133, 133, 133, 1)",
                          fontSize: "13px",
                          marginRight: "5px",
                        }}
                      >
                        edited:
                      </span>
                    </span>
                  ) : (
                    ""
                  )}
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
