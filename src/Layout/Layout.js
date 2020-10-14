import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BlogContext } from "../components/Context/Context/BlogContext";

import UpVotesBlog from "../components/Context/UpVotesBlog/UpVotesBlog";
import "./Layout.css";

import { GiEarthAfricaEurope } from "react-icons/gi";
import { FaUser } from "react-icons/fa";

import { AiOutlineDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";

import UserPanel from "../components/Context/UserPanel/UserPanel";

function Layout(props) {
  const { valueTwo } = useContext(BlogContext);
  const [loggedIn] = valueTwo;

  const [toggle, setToggle] = useState(false);

  return (
    <div className="LayoutJS">
      <div className="logoBar">
        <span>
          <GiEarthAfricaEurope />
        </span>
        <h1>Travel Blog</h1>
      </div>

      <div className="themainbodyContainer">
        <div className="headerBar">
          <nav className="navBar">
            <ul>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </Link>

              <Link
                to="allpost/"
                style={{ textDecoration: "none", color: "black" }}
              >
                All Post
              </Link>
              <Link
                to={loggedIn ? "createpost/" : "login/"}
                style={{ textDecoration: "none", color: "black" }}
              >
                Create Post
              </Link>
              <li>Filter</li>
            </ul>
          </nav>
         
          <span className="loginBar">
            {loggedIn ? (
              <div className="trybeRelative">
                <span onClick={() => setToggle(!toggle)}>
                  {!toggle ? <AiOutlineDown /> : <AiFillCaretUp />}
                  User Panel{" "}
                </span>

                {toggle && <UserPanel />}
              </div>
            ) : (
              <Link
                to={!loggedIn && "login/"}
                style={{ textDecoration: "none", color: "black" }}
              >
                {" "}
                <p>
                  <FaUser />
                  {"  "}register/login
                </p>
              </Link>
            )}
          </span>
        </div>
      </div>
      {props.children}
      <div>
        <UpVotesBlog />
      </div>
    </div>
  );
}

export default Layout;
