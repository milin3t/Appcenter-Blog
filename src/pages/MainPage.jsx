import React, { useState, useEffect } from "react";
import "../styles/Main.css";
import Sidebar from "../components/Sidebar";
import PostView from "../components/PostView";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MainPage = ({ userId, nickname }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // 유저의 게시글 목록 가져오기
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(
          `/api/contents/category?userId=${userId}`
        );
        setPosts(response.data.response || []);
      } catch (error) {
        console.error("게시글 목록을 불러오는 데 실패했습니다.", error);
      }
    };

    fetchUserPosts();
  }, [userId]);

  // 특정 게시글 조회
  const handleSelectPost = async (postId) => {
    try {
      const response = await axios.get(`/api/contents/${postId}`);
      setSelectedPost(response.data.response);
    } catch (error) {
      console.error("게시글을 불러오는 데 실패했습니다.", error);
    }
  };

  // 네비게이션 핸들러
  const handleLogout = () => navigate("/");
  const handleEditUser = () => navigate("/edit-user");
  const handleNewPost = () => navigate("/posting");
  const handleToFeed = () => navigate("/feed");

  return (
    <div className="mainpage-container">
      <div className="left-container">
        <div className="profile-box">
          <div className="profile-info">
            <div className="profile-image-placeholder"></div>
            <p className="nickname">
              {nickname ? `${nickname}님, 환영합니다.` : "null님, 환영합니다."}
            </p>
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
        <Sidebar posts={posts} onSelectPost={handleSelectPost} />
      </div>

      <div className="right-container">
        <div className="header-box">
          <button className="header-button" onClick={handleToFeed}>
            친구 목록
          </button>
          <button className="header-button" onClick={handleToFeed}>
            둘러보기
          </button>
          <button className="header-button" onClick={handleNewPost}>
            글 작성
          </button>
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
