import React, { useContext, useEffect, useState } from "react";
import { BlogContext } from "../Context/BlogContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./User.css";
import Moment from "react-moment";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";

const User = () => {
  const { valueOne, valueSix } = useContext(BlogContext);
  const [blogs] = valueOne;
  const [favorites] = valueSix;
  const { id } = useParams();
  const data = id;
  const [user, setUser] = useState(null);
  const [userPost, setUserPost] = useState([]);
  const [userLikes, setUserLikes] = useState([]);
  const [userComments, setUserComments] = useState(null);
  console.log(userComments);

  const [togglePost, setTogglePost] = useState(false);
  const [toggleLiked, setToggleLiked] = useState(false);
  const [toggleComments, setToggleComments] = useState(false);

  useEffect(() => {
    const fintmyAcc = favorites.find((el) => {
      //THis finds the Data by Ths User Name
      return el.id === data;
    });
    const findAccPost = blogs.filter((el) => {
      //This finds all post by this User
      return el.useremail === data;
    });
    setUserPost(findAccPost);
    setUser(fintmyAcc);

    if (user) {
      //This one bottom one returns likes of user
      const findAccLikes = blogs.filter((elz) => {
        return user.myLikes.find((anotherOne_el) => {
          return anotherOne_el === elz.id;
        });
      });
      setUserLikes(findAccLikes);
      //Find the COmments and Post
      const findComment = (param) =>
        blogs.filter((elz) => {
          return elz.id === param;
        });
      const getallComments = [...user.myComments];

      let result = getallComments.map((el) => {
        let o = Object.assign({}, el);
        o.title = findComment(el.postId)[0];
        return o;
      });

      setUserComments(result);
    }
  }, [favorites, blogs, data, user]);

  return (
    <div className="userInfos">
      <h1>User Panel</h1>
      {user && (
        <p>
          user: <b>{user.id}</b>
        </p>
      )}
      <span onClick={() => setTogglePost(!togglePost)}>
        {togglePost ? <AiFillCaretUp /> : <AiFillCaretDown />}Posts
      </span>
      {togglePost && (
        <div className="userinfosPost">
          {userPost.map((key) => {
            return (
              <Link
                key={key.id}
                to={`/detail/${key.id}`}
                // state={object}
                style={{ textDecoration: "none" }}
              >
                <p>{key.title}</p>
                <p>
                  <Moment
                    style={{
                      fontStyle: "italic",
                      color: "rgba(172, 171, 171, 0.616)",
                    }}
                    format="YYYY/MM/DD"
                  >
                    {key.date}
                  </Moment>
                </p>
              </Link>
            );
          })}
        </div>
      )}
      <span onClick={() => setToggleLiked(!toggleLiked)}>
        {toggleLiked ? <AiFillCaretUp /> : <AiFillCaretDown />}LikedPost
      </span>
      {toggleLiked && (
        <div className="userinfosPost">
          {userLikes.map((key) => {
            return (
              <Link
                key={key.id}
                to={`/detail/${key.id}`}
                // state={object}
                style={{ textDecoration: "none" }}
              >
                <p>{key.title}</p>
                <p>
                  <Moment
                    style={{
                      fontStyle: "italic",
                      color: "rgba(172, 171, 171, 0.616)",
                    }}
                    format="YYYY/MM/DD"
                  >
                    {key.date}
                  </Moment>
                </p>
              </Link>
            );
          })}
        </div>
      )}
      <span onClick={() => setToggleComments(!toggleComments)}>
        {toggleComments ? <AiFillCaretUp /> : <AiFillCaretDown />}Comments
      </span>
      {toggleComments && (
        <div className="userinfosComments">
          {userComments &&
            userComments.map((key) => {
              return (
                <div>
                  <p key={key.date}>{key.text} commented in post:</p>
                  <span>
                    <Link
                      to={`/detail/${key.title.id}`}
                      // state={object}
                      style={{ textDecoration: "none" }}
                    >
                      {key.title.title}
                    </Link>
                  </span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default User;
