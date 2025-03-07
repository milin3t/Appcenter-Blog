// src/pages/MainPage.jsx
import React, { useState, useEffect } from "react";
import "../styles/Main.css";
import Sidebar from "../components/Sidebar";
import PostView from "../components/PostView";
import { useNavigate } from "react-router-dom";

const MainPage = ({ userId, nickname }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/contents/category?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setPosts(data.response))
      .catch((err) => console.error(err));
  }, [userId]);

  const handleSelectPost = (postId) => {
    fetch(`/api/contents/${postId}`)
      .then((res) => res.json())
      .then((data) => setSelectedPost(data.response))
      .catch((err) => console.error(err));
  };

  const handleLogout = () => navigate("/");
  const handleEditUser = () => navigate("/edit-user");
  const handleNewPost = () => navigate("/posting");

  return (
    <div className="mainpage-container">
      <div className="left-container">
        <div className="profile-box">
          <div className="profile-info">
            <div className="profile-image-placeholder"></div>
            <p className="nickname">{userId}님, 환영합니다.</p>
          </div>
          <div className="profile-actions">
            <span className="logout-btn" onClick={handleLogout}>
              로그아웃
            </span>
            <span className="edit-btn" onClick={handleEditUser}>
              정보 수정하기
            </span>
          </div>
        </div>
        <Sidebar posts={posts} onSelectPost={setSelectedPost} />
      </div>

      <div className="right-container">
        <div className="header-box">
          <button className="header-button">친구 목록</button>
          <button className="header-button">둘러보기</button>
          <button className="header-button">글 작성</button>
        </div>
        <div className="post-box">
          {posts.length === 0 ? (
            <div className="no-posts-main">
              <p>불러올 글이 없습니다!</p>
              <button className="new-post-btn" onClick={handleNewPost}>
                새로운 글 작성하기
              </button>
            </div>
          ) : (
            <PostView post={selectedPost} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
