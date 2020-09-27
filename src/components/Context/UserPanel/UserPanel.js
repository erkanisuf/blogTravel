import React, { useContext, useState, useEffect } from "react";
import { BlogContext } from "../Context/BlogContext";
import { Link } from "react-router-dom";

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
  }, [blogs, favorites, useremail]);

  return (
    <div>
      {myFavs.length > 0
        ? myFavs.map((key, index) => {
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
        : "No Favs yet"}
    </div>
  );
};

export default UserPanel;
