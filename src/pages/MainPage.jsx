import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../styles/Main.css";
import Sidebar from "../components/Sidebar";
import PostView from "../components/PostView";
import Friends from "../components/Friends";
import profile from "../assets/profile.png";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MainPage = () => {
  const { user, logout } = useAuth();
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]); // 전체 유저 목록
  const [showFriends, setShowFriends] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user.userId) return;
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/contents/category?userId=${user.userId}`
        );
        setPosts(response.data || []);
      } catch (error) {
        console.error("게시글 목록을 불러오는 데 실패했습니다.", error);
      }
    };

    fetchUserPosts();
  }, [user.userId]);

  const handleSelectPost = async (postId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/contents/${postId}`
      );
      setSelectedPost(response.data);
      setSelectedPostId(postId);
    } catch (error) {
      console.error("게시글을 불러오는 데 실패했습니다.", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/members`);
      setUsers(response.data || []);
    } catch (error) {
      console.error("사용자 목록을 불러오는 데 실패했습니다.", error);
    }
  };

  const handleShowFriends = () => {
    setShowFriends(true);
    fetchUsers();
  };

  return (
    <div className="mainpage-container">
      <div className="left-container">
        <div className="profile-box">
          <div className="profile-info">
            <div className="profile-image-placeholder">
              <img
                src={profile}
                style={{ width: "180px", height: "180px", borderRadius: "50%" }}
              ></img>
            </div>
            <p className="nickname">
              {user.nickname ? `${user.nickname}님, 환영합니다.` : "null님"}
            </p>
          </div>
          <div className="profile-actions">
            <span className="logout-btn" onClick={handleLogout}>
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
          <button className="header-button" onClick={handleShowFriends}>
            친구 목록
          </button>
          <button className="header-button" onClick={() => navigate("/feed")}>
            둘러보기
          </button>
          <button
            className="header-button"
            onClick={() => navigate("/posting")}
          >
            글 작성
          </button>
        </div>
        <div className="post-box">
          {showFriends ? (
            <Friends users={users} />
          ) : posts.length === 0 ? (
            <div className="no-posts-main">
              <p>불러올 글이 없습니다!</p>
              <button
                className="new-post-btn"
                onClick={() => navigate("/posting")}
              >
                새로운 글 작성하기
              </button>
            </div>
          ) : (
            <PostView post={selectedPost} postId={selectedPostId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
