import React from "react";
import "../styles/Main.css";

const MainPage = ({ userId }) => {
  return (
    <div className="mainpage-container">
      <div className="left-container">
        <div className="profile-box">
          <p className="p1">{userId}님,</p>
          <p className="p2">환영합니다.</p>
        </div>
        <div className="sidebar-box"></div>
      </div>

      <div className="right-container">
        <div className="header-box">
          <div className="header-buttons-container">
            <button className="header-button">친구 목록</button>
            <button className="header-button">둘러보기</button>
            <button className="header-button">글 작성</button>
          </div>
        </div>
        <div className="post-box"></div>
      </div>
    </div>
  );
};

export default MainPage;
