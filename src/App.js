import React, { useContext } from "react";
import "./App.css";
import Main from "./components/Context/Main/Main";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";

import CreatePost from "./components/Context/CreatePost/CreatePost";
import Login from "./components/Context/Login/Login";
import Detail from "./components/Context/Detail/Detail";
import AllPost from "./components/Context/AllPost/AllPost";
import UserPanel from "./components/Context/UserPanel/UserPanel";
import EditPost from "./components/Context/UserPanel/EditPost";
import MyPost from "./components/Context/UserPanel/MyPost";
import UserFavorites from "./components/Context/UserPanel/UserFavorites";
import { BlogContext } from "./components/Context/Context/BlogContext";
import PrivateRouter from "./PrivateRouter";

function App() {
  const { valueTwo } = useContext(BlogContext);
  const [loggedIn] = valueTwo;
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="detail/:id" element={<Detail />} />

        <Route path="login/" element={<Login />} />
        <Route path="allpost/" element={<AllPost />} />

        <PrivateRouter
          isAuth={loggedIn}
          path="userpanel/"
          component={UserPanel}
          redirectTo="/login"
        />
        <PrivateRouter
          isAuth={loggedIn}
          path="createpost/"
          component={CreatePost}
          redirectTo="/login"
        />
        <PrivateRouter
          isAuth={loggedIn}
          path="userpanel/userfavorites/"
          component={UserFavorites}
          redirectTo="/login"
        />
        <PrivateRouter
          isAuth={loggedIn}
          path="userpanel/myposts/"
          component={MyPost}
          redirectTo="/login"
        />
        <PrivateRouter
          isAuth={loggedIn}
          path="detail/:id/editpost/"
          component={EditPost}
          redirectTo="/login"
        />
      </Routes>
    </Layout>
  );
}

export default App;
