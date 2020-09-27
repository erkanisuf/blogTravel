import React, { useContext } from "react";
import { BlogContext } from "../Context/BlogContext";
import "./UpVotesBlog.css";
import { Link } from "react-router-dom";
import Carousel, {
  slidesToShowPlugin,
  slidesToScrollPlugin,
} from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { ImHeart } from "react-icons/im";
import { FaUserAlt } from "react-icons/fa";

import { IconContext } from "react-icons";

const UpVotesBlog = ({ link }) => {
  const { valueOne } = useContext(BlogContext);
  const [blogs] = valueOne;
  const upvotearrCop = [...blogs];
  const rankblogs = upvotearrCop.sort(
    (a, b) => b.likes.length - a.likes.length
  );

  return (
    <div className="upvoteContainer">
      <Carousel
        arrows
        arrowLeft={
          <IconContext.Provider
            value={{
              className: "global-class-name",
            }}
          >
            <MdKeyboardArrowLeft />
          </IconContext.Provider>
        }
        arrowLeftDisabled={
          <IconContext.Provider
            value={{
              className: "global-class-name",
            }}
          >
            <MdKeyboardArrowLeft />
          </IconContext.Provider>
        }
        arrowRight={
          <IconContext.Provider
            value={{
              className: "global-class-name",
            }}
          >
            <MdKeyboardArrowRight />
          </IconContext.Provider>
        }
        arrowRightDisabled={
          <IconContext.Provider
            value={{
              className: "global-class-name",
            }}
          >
            <MdKeyboardArrowRight />
          </IconContext.Provider>
        }
        addArrowClickHandler={true}
        offset={0}
        itemWidth={300}
        plugins={[
          "centered",

          "arrows",
          {
            resolve: slidesToShowPlugin,
            options: {
              numberOfSlides: 3,
            },
          },

          {
            resolve: slidesToScrollPlugin,
            options: {
              numberOfSlides: 3,
            },
          },
        ]}
      >
        {rankblogs.map((object, index) => {
          return (
            <div
              style={{
                backgroundImage: `url(${object.image})`,
              }}
              className="upvoteItems"
              key={index}
            >
              <Link
                to={`detail/${object.id}`}
                state={object}
                // navigate={{
                //   pathname: `/detail/${object.id}`,
                //   data: [{ id: 1, object: "Ford", color: "red" }],
                // }}
                style={{ textDecoration: "none" }}
              >
                {/* <Link
                to={`/${object.title}`}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "250px",
                }}
              > */}
                <div className="userHeart">
                  <div>
                    <FaUserAlt />
                    {"             "}
                    {object.name}
                  </div>
                  <div>
                    <ImHeart />
                    {object.likes.length}
                  </div>
                </div>

                <div className="h1justtitle">
                  <h1>{object.title}</h1>
                </div>
              </Link>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default UpVotesBlog;
