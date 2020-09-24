import React, { useEffect } from "react";

const Comment = ({ commentId }) => {
  useEffect(() => {
    const commentBox = require("commentbox.io");
    commentBox("5667082964303872-proj");
  }, []);

  return (
    <div>
      <div className="commentbox" id={commentId} />
    </div>
  );
};

export default Comment;
