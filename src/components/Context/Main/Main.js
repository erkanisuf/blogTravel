import React, { useContext, useState } from "react";
import { BlogContext } from "../Context/BlogContext";
import "./Main.css";
import { Link, Outlet } from "react-router-dom";
import { SiSuperuser } from "react-icons/si";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { IconContext } from "react-icons";

const Main = () => {
  const { valueOne } = useContext(BlogContext);
  const [blogs] = valueOne;

  const [value, setValue] = useState(5);
  const [isOpen, setisOpen] = useState(true);
  // let [searchParams, setSearchParams] = useSearchParams();

  const addMore = () => {
    setValue(value + 3);
    showMore();
  };

  const ShowLess = () => {
    setValue(value - 3);
    showLezz();
  };

  const showMore = () => {
    value >= blogs.length - 3 ? setisOpen(false) : setisOpen(true);
  };
  const showLezz = () => {
    if (value <= blogs.length) {
      setisOpen(true);
    }
  };

  return (
    <div>
      <div className="MainContainer">
        {blogs.slice(0, value).map((object, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundImage: `url(${object.image})`,
              }}
            >
              <div
                className="insides"
                // onClick={() =>
                //   navigate(`/detail/${name.title}`, {
                //     state: name,
                //     search: name.title,
                //   })
                // }
              >
                <Link
                  key={object}
                  to={`detail/${object.id}`}
                  state={object}
                  style={{ textDecoration: "none" }}
                >
                  <h5>
                    <SiSuperuser />
                    {object.name}
                  </h5>
                  <h1>{object.title}</h1>
                </Link>
                <Outlet />
              </div>
            </div>
          );
        })}
      </div>

      {isOpen ? (
        <button className="isOpenbtn" onClick={addMore}>
          <IconContext.Provider
            value={{
              className: "dropDWN",
            }}
          >
            <RiArrowDropDownLine />
            Show More
          </IconContext.Provider>
        </button>
      ) : (
        <button className="isOpenbtn" onClick={ShowLess}>
          <IconContext.Provider
            value={{
              className: "dropDWN",
            }}
          >
            <RiArrowDropUpLine />
            Show Less
          </IconContext.Provider>
        </button>
      )}
      {value >= blogs.length ? (
        <p className="dropDWNP">No more post....</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Main;

//<Link to={`/${name.title}`} style={{ textDecoration: "none" }}>
