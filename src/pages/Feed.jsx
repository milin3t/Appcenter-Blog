import React from "react";
import "../styles/Feed.css";
import PostView from "../components/PostView";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const navigate = useNavigate();
  const handleToMain = () => navigate("/");
  const handleNewPost = () => navigate("/posting");

  return (
    <div className="feed-container">
      <div className="left-container">
        <div className="feed-sidebar-box">
          <div className="feed-sidebar-font">
            Friends
            <br />
            List
          </div>
          <div className="feed-to-main-button">메인 화면</div>
        </div>
      </div>

      <div className="right-container">
        <div className="header-box">
          <button className="header-button" onClick={handleToMain}>
            메인으로
          </button>
          <button className="header-button">둘러보기</button>
          <button className="header-button" onClick={handleNewPost}>
            글 작성
          </button>
        </div>
        <div className="post-box">
          <PostView />
        </div>
      </div>
    </div>
  );
};

export default Feed;
