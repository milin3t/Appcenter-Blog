// src/pages/MainPage.jsx
import React, { useState, useEffect } from "react";
import "../styles/Main.css";
import Sidebar from "../components/Sidebar";

const MainPage = ({ userId }) => {
  const [posts, setPosts] = useState([
    { id: 1, title: "첫 번째 게시글" },
    { id: 2, title: "두 번째 게시글" },
    { id: 2, title: "두 번째 게시글" },
    { id: 2, title: "두 번째 게시글" },
    { id: 2, title: "두 번째 게시글" },
    { id: 2, title: "두 번째 게시글" },
    { id: 2, title: "두 번째 게시글" },
    { id: 2, title: "두 번째 게시글" },
    { id: 2, title: "두 번째 게시글" },
    { id: 2, title: "두 번째 게시글" },
    { id: 2, title: "두 번째 게시글" },
    { id: 2, title: "두 번째 게시글" },
    { id: 2, title: "두 번째 게시글" },
    { id: 2, title: "두 번째 게시글" },

    // 임시 데이터
  ]);

  return (
    <div className="mainpage-container">
      <div className="left-container">
        <div className="profile-box">
          <p>{userId}님, 환영합니다.</p>
        </div>
        <Sidebar posts={posts} />
      </div>

      <div className="right-container">
        <div className="header-box">
          <button className="header-button">친구 목록</button>
          <button className="header-button">둘러보기</button>
          <button className="header-button">글 작성</button>
        </div>
        <div className="post-box"></div>
      </div>
    </div>
  );
};

export default MainPage;
