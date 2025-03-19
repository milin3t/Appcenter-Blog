import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Sidebar.css";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Sidebar = ({ onSelectPost }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user.userId) return; // userId가 없으면 API 호출 X

    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/contents/category?userId=${user.userId}`
        );

        console.log("✅ API 응답 데이터:", response.data);
        setPosts(response.data || []);
      } catch (error) {
        console.error("❌ 게시글을 불러오는 데 실패했습니다.", error);
        setError("게시글을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user.userId]);

  return (
    <div className="sidebar-box">
      {loading ? (
        <p className="loading-text">로딩 중...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : posts && posts.length > 0 ? (
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
