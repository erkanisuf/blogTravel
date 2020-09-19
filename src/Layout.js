import React, { useContext } from "react";
import UpVotesBlog from "./components/Context/UpVotesBlog";
import { Link } from "react-router-dom";
import { BlogContext } from "./components/Context/BlogContext";
import { auth } from "./firebase/firebase";
import { useNavigate } from "react-router-dom";
import Main from "./components/Context/Main";
import PostDetail from "./components/Context/PostDetail";

function Layout(props) {
  const { valueOne, valueTwo, valueThree } = useContext(BlogContext);
  const [blogs] = valueOne;
  const [loggedIn, setloggedIn] = valueTwo;
  const [userId, setuserId] = valueThree;
  const navigate = useNavigate();

  const signOut = (e) => {
    e.preventDefault();
    setuserId(null);
    setloggedIn(false);
    auth.signOut();
    navigate("/");
  };
  return (
    <div>
      <div>
        {loggedIn ? (
          <p onClick={signOut}>Sign Out</p>
        ) : (
          <Link to={!loggedIn && "login/"}>
            {" "}
            <p>register/login</p>
          </Link>
        )}
      </div>

      <h1>THIS IS LAYOUT</h1>

      {props.children}
      <UpVotesBlog />
    </div>
  );
}

export default Layout;
