import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostView from "../components/PostView";
import "../styles/Feed.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Feed = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/members`);
        setUsers(response.data || []);
      } catch (error) {
        console.error("사용자 목록을 불러오는 데 실패했습니다.", error);
      }
    };

    fetchUsers();
  }, []);

  const fetchUserPosts = async (userId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/contents/category?userId=${userId}`
      );
      setPosts((response.data || []).sort((a, b) => b.postId - a.postId)); // 최신순 정렬
      setSelectedUser(userId);
      setSelectedPost(null);
    } catch (error) {
      console.error("게시글을 불러오는 데 실패했습니다.", error);
    }
  };

  return (
    <div className="feed-container">
      <div className="left-container">
        <div className="feed-sidebar-box">
          <h2 className="feed-sidebar-font">
            Friends
            <br />
            List
          </h2>
          <ul className="user-list">
            {users.map((user, index) => (
              <li
                key={index}
                className={`user-item ${
                  selectedUser === user.userId ? "selected" : ""
                }`}
                onClick={() => fetchUserPosts(user.userId)}
              >
                <div className="user-profile-placeholder"></div>
                <span className="user-name">{user.nickname}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="right-container">
        <div className="header-box">
          <button className="header-button" onClick={() => navigate("/main")}>
            메인으로
          </button>
          <button className="header-button">둘러보기</button>
          <button
            className="header-button"
            onClick={() => navigate("/posting")}
          >
            글 작성
          </button>
        </div>

        <div className="post-box">
          {!selectedPost ? (
            selectedUser ? (
              posts.length > 0 ? (
                posts.map((post) => (
                  <div
                    key={post.postId}
                    className="post-preview"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="post-preview-header">
                      <h2 className="preview-title">{post.title}</h2>
                      <span className="preview-date">{post.postTime}</span>
                    </div>
                    <p className="preview-author">by. {post.nickname}</p>
                    <p className="preview-content">{post.contents}</p>
                  </div>
                ))
              ) : (
                <p className="no-posts">이 사용자의 게시글이 없습니다!</p>
              )
            ) : (
              <p className="no-posts">유저를 선택해주세요.</p>
            )
          ) : (
            <PostView post={selectedPost} editable={false} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
