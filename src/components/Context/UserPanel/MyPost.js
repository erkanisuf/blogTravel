import React from "react";
import { Link } from "react-router-dom";
import { db } from "../../../firebase/firebase";
const UserPanel = ({ useremail, blogs }) => {
  const mypost = blogs.filter((el) => {
    return el.useremail === useremail;
  });

  const deletePost = (e) => {
    console.log(e);
    db.collection("blogpost").doc(e).delete();
  };

  return (
    <div>
      <h1>Post by me</h1>
      {mypost.length > 0
        ? mypost.map((key, index) => {
            return (
              <div key={index}>
                <button
                  onClick={() => {
                    deletePost(key.id);
                  }}
                >
                  delete
                </button>
                <Link
                  to={`/detail/${key.id}/editpost/`}
                  state={key}
                  style={{ textDecoration: "none" }}
                >
                  <button>Edit</button>
                </Link>

                <Link
                  to={`/detail/${key.id}`}
                  state={key}
                  style={{ textDecoration: "none" }}
                >
                  <p>{key.title}</p>
                </Link>
              </div>
            );
          })
        : "You havent shared story yet"}
    </div>
  );
};

export default UserPanel;
