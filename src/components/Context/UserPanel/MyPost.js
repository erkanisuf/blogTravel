import React from "react";
import { Link } from "react-router-dom";

const UserPanel = ({ useremail, blogs }) => {
  const mypost = blogs.filter((el) => {
    return el.useremail === useremail;
  });

  console.log("mypost", mypost);

  return (
    <div>
      <h1>Post by me</h1>
      {mypost.length > 0
        ? mypost.map((key, index) => {
            return (
              <div key={index}>
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
