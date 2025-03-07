import React from "react";
import "../styles/PostView.css";

const PostView = ({ post }) => {
  if (!post) {
    return <div className="post-view-container">게시글을 선택해주세요.</div>;
  }

  return (
    <div className="post-view-container">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-contents">{post.contents}</p>
    </div>
  );
};

export default PostView;
