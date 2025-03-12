import React from "react";
import "../styles/Feed.css";
import PostView from "../components/PostView";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const navigate = useNavigate();
  const handleToMain = () => {
    navigate("/main");
  };
  return (
    <div className="feed-container">
      {/* Left Container: 하얀색 박스 하나만 존재 */}
      <div className="left-container">
        <div className="feed-sidebar-box"></div>
      </div>

      {/* Right Container: MainPage와 동일하게 유지 */}
      <div className="right-container">
        <div className="header-box">
          <button className="header-button" onClick={handleToMain}>
            메인으로
          </button>
          <button className="header-button">둘러보기</button>
          <button className="header-button">글 작성</button>
        </div>
        <div className="post-box">
          <PostView />
        </div>
      </div>
    </div>
  );
};

export default Feed;
