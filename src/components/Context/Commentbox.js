import React, { useEffect } from "react";

const Commentbox = ({ idz }) => {
  useEffect(() => {
    const commentBox = require("commentbox.io");
    commentBox("5702429697900544-proj");
  });
  return (
    <div>
      <div className="commentbox" id={idz} />
    </div>
  );
};

export default Commentbox;
