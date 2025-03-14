import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Sidebar.css";

const Sidebar = ({ userId, onSelectPost }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/contents/category?userId=${userId}`
        );
        setPosts(response.data.response || []);
      } catch (error) {
        console.error("게시글 목록을 불러오는 데 실패했습니다.", error);
      }
    };

    fetchUserPosts();
  }, [userId]);

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
                onClick={() => onSelectPost(post.postId)}
              >
                {post.title}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="no-posts">불러올 글이 없습니다!</div>
      )}
    </div>
  );
};

export default Sidebar;
