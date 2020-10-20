import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BlogContext } from "../components/Context/Context/BlogContext";

import UpVotesBlog from "../components/Context/UpVotesBlog/UpVotesBlog";
import "./Layout.css";

import { GiEarthAfricaEurope } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { CgClose } from "react-icons/cg";

import { AiFillHome } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import { IoIosCreate } from "react-icons/io";
import { BsFilePost } from "react-icons/bs";

import UserPanel from "../components/Context/UserPanel/UserPanel";

function Layout(props) {
  const { valueTwo, valueEight } = useContext(BlogContext);
  const [loggedIn] = valueTwo;

  const [toggle, setToggle] = valueEight;

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
                <p>
                  <AiFillHome className="iconsForMenu" />
                  <span> Home</span>
                </p>
              </Link>

              <Link
                to="allpost/"
                style={{ textDecoration: "none", color: "black" }}
              >
                <p>
                  <BsFilePost className="iconsForMenu" />
                  <span> All Post</span>
                </p>
              </Link>
              <Link
                to={loggedIn ? "createpost/" : "login/"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <p>
                  <IoIosCreate className="iconsForMenu" />
                  <span> Create Post</span>
                </p>
              </Link>
              <span
                style={{ marginTop: "25px" }}
                className="mobileUser"
                onClick={() => setToggle(!toggle)}
              >
                {toggle ? <CgClose /> : <FaUser />}
              </span>
            </ul>
          </nav>

          <span className="loginBar">
            {loggedIn ? (
              <div className="trybeRelative">
                <span className="deskUser" onClick={() => setToggle(!toggle)}>
                  {!toggle ? <AiFillCaretDown /> : <AiFillCaretUp />}
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
