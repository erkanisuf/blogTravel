import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { BlogProvider } from "./components/Context/Context/BlogContext";

import App from "./App";

ReactDOM.render(
  <Router>
    <BlogProvider>
      <App />
    </BlogProvider>
  </Router>,
  document.getElementById("root")
);
