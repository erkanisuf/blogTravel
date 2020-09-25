import React, { useContext, useState, useEffect } from "react";
import { BlogContext } from "./BlogContext";

const UserPanel = () => {
  const { valueOne, valueThree, valueFour, valueSix } = useContext(BlogContext);
  const [blogs] = valueOne;
  const [useremail, setuserEmail] = valueFour;
  const [userid, setuserId] = valueThree;
  const [favorites, setfavorites] = valueSix;

  console.log(favorites);
  console.log(blogs);

  const checkuserAndPost = () => {
    let arr = blogs;
    let favK = favorites.find((el) => {
      return el.id === useremail;
    });

    const putka = { ...favK };
    const anusaa = putka.favoritePost;
    const kurche = [...anusaa];
    console.log("kurche", kurche);

    const intersection = blogs.filter((element) => kurche.includes(element.id));
    console.log(intersection);
  };

  return (
    <div>
      <button onClick={checkuserAndPost}>sllslsls</button>
    </div>
  );
};

export default UserPanel;
