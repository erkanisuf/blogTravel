import React, { useContext } from "react";
import "./App.css";
import Main from "./components/Context/Main";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

import CreatePost from "./components/Context/CreatePost";
import Login from "./components/Context/Login";
import Detail from "./components/Context/Detail";
import AllPost from "./components/Context/AllPost";
import UserPanel from "./components/Context/UserPanel";
import { BlogContext } from "./components/Context/BlogContext";
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
      </Routes>
    </Layout>
  );
}

export default App;
