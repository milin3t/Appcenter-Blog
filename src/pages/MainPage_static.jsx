// src/pages/MainPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Main.css";
import Sidebar from "../components/Sidebar";
import PostView from "../components/PostView";

const MainPage = ({ userId }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "첫 번째 게시글",
      contents: "첫 번째 게시글의 내용",
    },
    {
      id: 2,
      title: "두 번째 게시글",
      contents: "두 번째 게시글의 내용",
    },
    // 추가 게시글...
  ]);

  const handleSelectPost = (post) => {
    setSelectedPost(post);
  };

  return (
    <div className="mainpage-container">
      <div className="left-container">
        <div className="profile-box">
          <div className="profile-info">
            <div className="profile-image-placeholder"></div>
            <p className="nickname">{userId}님, 환영합니다.</p>
          </div>
          <div className="profile-actions">
            <span className="logout-btn" onClick={() => navigate("/")}>
              로그아웃
            </span>
            <span className="edit-btn" onClick={() => navigate("/edit-user")}>
              정보 수정하기
            </span>
          </div>
        </div>
        <Sidebar posts={posts} onSelectPost={handleSelectPost} />
      </div>

      <div className="right-container">
        <div className="header-box">
          <button className="header-button">친구 목록</button>
          <button className="header-button">둘러보기</button>
          <button className="header-button">글 작성</button>
        </div>
        <div className="post-box">
          <PostView post={selectedPost} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
