import React from "react";
import { BlogProvider } from "./components/Context/BlogContext";
import "./App.css";
import Main from "./components/Context/Main";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Layout from "./Layout";

import CreatePost from "./components/Context/CreatePost";
import Login from "./components/Context/Login";
import Detail from "./components/Context/Detail";
import AllPost from "./components/Context/AllPost";

function App() {
  return (
    <BlogProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="login/" element={<Login />} />
          <Route path="createpost/" element={<CreatePost />} />
          <Route path="allpost/" element={<AllPost />} />
        </Routes>
      </Layout>
    </BlogProvider>
  );
}

export default App;
