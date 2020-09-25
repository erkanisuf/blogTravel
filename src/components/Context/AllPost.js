import React, { useContext, useState } from "react";
import { BlogContext } from "./BlogContext";
import Moment from "react-moment";
const AllPost = () => {
  const { valueOne, valueFive } = useContext(BlogContext);
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
        return a.likes.length - b.length;
      })
      .reverse();
    setmainArr(LeastLiked);
  };

  const MostLiked = () => {
    const coppyofBlogs = [...blogs];
    const mostLiked = coppyofBlogs.sort((a, b) => {
      return a.likes.length - b.length;
    });

    setmainArr(mostLiked);
  };

  console.log("filter arr BEFORE", mainArr);
  return (
    <div>
      <h1>Allpost</h1>
      <button onClick={newesttPost}>Newsrt</button>
      <button onClick={oldestPost}>Oldest</button>
      <button onClick={LeastLiked}>LeastLiked</button>
      <button onClick={MostLiked}>MostLiked</button>
      {mainArr.map((key, index) => {
        return (
          <div key={index}>
            <p style={{ color: "red" }}>{key.title}</p>
            <p style={{ color: "red" }}>{key.likes.length}</p>
            <p>{key.name}</p>
            <Moment format="YYYY/MM/DD">{key.date}</Moment>
          </div>
        );
      })}
    </div>
  );
};

export default AllPost;
