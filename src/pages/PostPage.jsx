import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../styles/Post.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PostPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [isMain, setIsMain] = useState(false);

  // 🔹 게시글 작성 요청 (POST)
  const handlePost = async () => {
    if (!title.trim() || !contents.trim()) {
      alert("제목과 내용을 입력해주세요!");
      return;
    }

    try {
      console.log("test= 현재 로그인된 유저 정보:", user);
      const response = await axios.post(
        `${API_BASE_URL}/api/contents?userId=${user.userId}`,
        {
          title,
          contents,
          isMain,
        }
      );

      console.log("게시글 작성 성공", response.data);
      navigate("/main");
    } catch (error) {
      console.error("게시글 작성 실패", error);
      alert("게시글 작성에 실패했습니다.");
    }
  };

  return (
    <div className="posting">
      <input
        className="post-headings"
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="post-contexts"
        placeholder="내용을 입력하세요..."
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      ></textarea>

      <div className="post-bottom-section">
        <label className="main-post-checkbox">
          <input
            type="checkbox"
            checked={isMain}
            onChange={(e) => setIsMain(e.target.checked)}
          />
          대표 글로 설정하기
        </label>

        <div className="post-buttons">
          <button className="post-button submit-btn" onClick={handlePost}>
            게시
          </button>
          <button
            className="post-button cancel-btn"
            onClick={() => navigate("/main")}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
