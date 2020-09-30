import React, { useContext, useState } from "react";
import { BlogContext } from "../Context/BlogContext";
import Moment from "react-moment";
import "./AllPost.css";

import { FaUser } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";

import { MdDateRange } from "react-icons/md";
import { BiHistory } from "react-icons/bi";
import { AiOutlineDislike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
const AllPost = () => {
  const { valueOne } = useContext(BlogContext);
  const [blogs] = valueOne;

  const [mainArr, setmainArr] = useState([...blogs]);

  const oldestPost = () => {
    const coppyofBlogs = [...blogs];
    const old = coppyofBlogs.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    setmainArr(old);
  };
  const newesttPost = () => {
    const coppyofBlogs = [...blogs];
    const newZ = coppyofBlogs
      .sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      })
      .reverse();
    setmainArr(newZ);
  };

  const LeastLiked = () => {
    const coppyofBlogs = [...blogs];
    const LeastLiked = coppyofBlogs
      .sort((a, b) => {
        console.log(a.likes.length, "b", b.likes.length);
        return b.likes.length - a.likes.length;
      })
      .reverse();
    setmainArr(LeastLiked);
  };

  const MostLiked = () => {
    const coppyofBlogs = [...blogs];
    const mostLiked = coppyofBlogs.sort((a, b) => {
      console.log(a, b);
      return b.likes.length - a.likes.length;
    });

    setmainArr(mostLiked);
  };

  const MostCommented = () => {
    const coppyofBlogs = [...blogs];
    const mostCommented = coppyofBlogs.sort((a, b) => {
      console.log(a, b);
      return b.comments.length - a.comments.length;
    });

    setmainArr(mostCommented);
  };

  console.log("filter arr BEFORE", mainArr);
  return (
    <div className="ContainerAllPost">
      <h1>Allpost</h1>
      <div className="filterButtons">
        <div style={{ color: "black", fontStyle: "bold", fontWeight: "900" }}>
          Sort by:
        </div>
        <span onClick={newesttPost}>
          Newsrt
          <MdDateRange />
        </span>
        <span onClick={oldestPost}>
          Oldest
          <BiHistory />
        </span>
        <span onClick={LeastLiked}>
          LeastLiked
          <AiOutlineDislike />
        </span>
        <span onClick={MostLiked}>
          MostLiked
          <AiOutlineLike />
        </span>
        <span onClick={MostCommented}>
          MostCommented
          <FaRegCommentAlt />
        </span>
      </div>

      <div className="flexAllPost">
        {mainArr.map((key, index) => {
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
        })}
      </div>
    </div>
  );
};

export default AllPost;
