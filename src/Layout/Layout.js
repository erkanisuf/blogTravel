import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BlogContext } from "../components/Context/Context/BlogContext";
import { auth } from "../firebase/firebase";

import UpVotesBlog from "../components/Context/UpVotesBlog/UpVotesBlog";
import "./Layout.css";

import { GiEarthAfricaEurope } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { ImExit } from "react-icons/im";

function Layout(props) {
  const { valueTwo, valueThree } = useContext(BlogContext);
  const [loggedIn, setloggedIn] = valueTwo;
  const [, setuserId] = valueThree;
  const navigate = useNavigate();

  const signOut = (e) => {
    e.preventDefault();
    setuserId(null);
    setloggedIn(false);
    auth.signOut();
    navigate("/");
  };
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
              <div>
                <p onClick={signOut}>
                  <ImExit /> Sign Out
                </p>
                <Link
                  to="userpanel/"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <p>User Panel </p>
                </Link>
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
