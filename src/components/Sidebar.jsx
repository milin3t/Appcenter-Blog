// src/components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Sidebar.css";

const Sidebar = ({ userId, onSelectPost }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 유저의 게시글 목록 가져오기
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(
          `/api/contents/category?userId=${userId}`
        );
        setPosts(response.data.response || []);
      } catch (error) {
        setError("게시글을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  return (
    <div className="sidebar-box">
      {loading ? (
        <p className="loading-text">로딩 중...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : posts.length > 0 ? (
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
        <div className="no-posts">
          <p>불러올 글이 없습니다!</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
