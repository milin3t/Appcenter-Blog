import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostView from "../components/PostView"; // 게시글 보기 컴포넌트
import "../styles/Feed.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Feed = () => {
  const [users, setUsers] = useState([]); // 전체 유저 목록
  const [selectedUser, setSelectedUser] = useState(null); // 선택한 유저 정보
  const [posts, setPosts] = useState([]); // 선택한 유저의 게시글 목록
  const navigate = useNavigate();

  // 🔹 전체 회원 목록 가져오기
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/members`);
        setUsers(response.data || []); // 응답 데이터를 유저 목록으로 설정
      } catch (error) {
        console.error("사용자 목록을 불러오는 데 실패했습니다.", error);
      }
    };

    fetchUsers();
  }, []);

  // 🔹 특정 유저의 게시글 가져오기 (userId 기반 조회)
  const fetchUserPosts = async (userId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/contents/category?userId=${userId}`
      );
      setPosts(response.data.response || []);
      setSelectedUser(userId); // 선택한 유저 저장
    } catch (error) {
      console.error("게시글을 불러오는 데 실패했습니다.", error);
    }
  };

  return (
    <div className="feed-container">
      {/* 왼쪽 사이드바 - 유저 목록 */}
      <div className="left-container">
        <div className="feed-sidebar-box">
          <h2 className="feed-sidebar-font">유저 목록</h2>
          <ul className="user-list">
            {users.map((user, index) => (
              <li key={index}>
                <button
                  className="user-button"
                  onClick={() => fetchUserPosts(user.userId)}
                >
                  {user.nickname}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 오른쪽 콘텐츠 영역 */}
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
          {selectedUser ? (
            posts.length > 0 ? (
              posts.map((post) => <PostView key={post.postId} post={post} />)
            ) : (
              <p className="no-posts">이 사용자의 게시글이 없습니다!</p>
            )
          ) : (
            <p className="no-posts">유저를 선택해주세요.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
