import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const UserPanel = ({ myFavs, favorites, useremail, blogs, setmyFavs }) => {
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
