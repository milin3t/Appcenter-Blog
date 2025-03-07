// src/components/Sidebar.jsx
import React from "react";
import "../styles/Sidebar.css";

const Sidebar = ({ posts, onSelectPost }) => {
  return (
    <div className="sidebar-box">
      {posts.length > 0 ? (
        <>
          <h3 className="sidebar-title">내 게시물</h3>
          <ul className="post-list">
            {posts.map((post, index) => (
              <li
                key={index}
                className="post-item"
                onClick={() => onSelectPost(post)}
              >
                {post.title}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="no-posts">불러올 글이 없습니다!</p>
      )}
    </div>
  );
};

export default Sidebar;
