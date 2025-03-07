import React, { useEffect, useState } from "react";
import "../styles/Main.css";

const MainPage = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 서버에서 로그인한 사용자의 게시글 가져오기
    fetch(`/api/contents/category?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.response) {
          setPosts(data.response);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("게시글 불러오기 실패:", error);
        setLoading(false);
      });
  }, [userId]);

  return (
    <div className="mainpage-container">
      <div className="left-container">
        <div className="profile-box">
          <p>{userId}님, 환영합니다.</p>
        </div>
        <div className="sidebar-box">
          {loading ? (
            <p className="loading-text">불러오는 중...</p>
          ) : posts.length > 0 ? (
            <>
              <h3 className="sidebar-title">내 게시물</h3>
              <ul className="post-list">
                {posts.map((post, index) => (
                  <li key={index} className="post-item">
                    {post.title}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="no-posts">불러올 글이 없습니다!</p>
          )}
        </div>
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
