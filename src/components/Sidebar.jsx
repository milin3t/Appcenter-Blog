// Sidebar.jsx
import React from "react";
import "../styles/Sidebar.css";

const Sidebar = ({ posts, onSelectPost }) => {
  return (
    <div className="sidebar-box">
      {posts.length > 0 ? (
        <>
          <h3 className="sidebar-title">내 게시물</h3>
          <ul className="post-list">
            {posts.map((post) => (
              <li
                key={post.postId}
                className="post-item"
                onClick={() => onSelectPost(post)}
              >
                {post.title}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="no-posts-container">
          <p className="no-posts">불러올 글이 없습니다!</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
