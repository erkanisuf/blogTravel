import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BlogContext } from "../Context/BlogContext";

import Moment from "react-moment";
import "./UserFavorites.css";

import { FaUser } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

const UserPanel = () => {
  const { valueOne, valueFour, valueSix } = useContext(BlogContext);
  const [blogs] = valueOne;

  const [useremail] = valueFour;

  const [favorites] = valueSix;

  const [myFavs, setmyFavs] = useState([]);
  useEffect(() => {
    const checkuserAndPost = () => {
      let favK = favorites.find((el) => {
        return el.id === useremail;
      });
      if (favK) {
        const putka = { ...favK };
        const anusaa = putka.favoritePost;

        const kurche = [...anusaa];

        const intersection = blogs.filter((element) =>
          kurche.includes(element.id)
        );

        const thiswillupdate = intersection;
        setmyFavs(thiswillupdate);
      } else {
        console.log("not found user");
      }
    };
    checkuserAndPost();
  }, [blogs, favorites, useremail, setmyFavs]);

  return (
    <div className="ContainerAllPost">
      <h1>My Favorite posts</h1>
      <div className="flexAllPost">
        {myFavs.length > 0
          ? myFavs.map((key, index) => {
              return (
                <Link
                  key={index}
                  to={`/detail/${key.id}`}
                  state={key}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="flexPosts">
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
                  </div>
                </Link>
              );
            })
          : "No Favorite posts yet!"}
      </div>
    </div>
  );
};

export default UserPanel;
