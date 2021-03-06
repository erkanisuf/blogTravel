import React, { useContext, useState, useEffect } from "react";
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
    setValue((valueCurrent) => valueCurrent + 3);
  };

  const ShowLess = () => {
    setValue(5);
  };

  useEffect(() => {
    const showMore = () => {
      value >= blogs.length ? setisOpen(false) : setisOpen(true);
    };
    const showLezz = () => {
      if (value <= blogs.length) {
        setisOpen(true);
      }
    };
    showMore();
    showLezz();
  }, [value, blogs.length]);

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
              <Link
                key={object}
                to={`detail/${object.id}`}
                state={object}
                style={{
                  textDecoration: "none",
                  width: "100%",
                  height: "85px",
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
                  <h5>
                    <SiSuperuser />
                    {object.name}
                  </h5>
                  <h1>{object.title}</h1>

                  <Outlet />
                </div>
              </Link>
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
