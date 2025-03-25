import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../styles/Post.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PostPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const postId = location.state?.postId; // 수정일 경우 존재함

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [main, setMain] = useState(false);

  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/api/contents/${postId}`
          );
          const post = response.data;
          setTitle(post.title);
          setContents(post.contents);
          setMain(post.isMain);
        } catch (error) {
          console.error("게시글 불러오기 실패", error);
        }
      };
      fetchPost();
    }
  }, [postId]);

  const handlePost = async () => {
    if (!title.trim() || !contents.trim()) {
      alert("제목과 내용을 입력해주세요!");
      return;
    }

    try {
      if (postId) {
        await axios.put(`${API_BASE_URL}/api/contents/${postId}`, {
          title,
          contents,
          main,
        });
      } else {
        await axios.post(`${API_BASE_URL}/api/contents?userId=${user.userId}`, {
          title,
          contents,
          main,
        });
      }

      navigate("/main");
    } catch (error) {
      console.error("게시글 작성/수정 실패", error);
      alert("게시글 처리 중 오류가 발생했습니다.");
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
            checked={main}
            onChange={(e) => setMain(e.target.checked)}
          />
          대표 글로 설정하기
        </label>

        <div className="post-buttons">
          <button className="post-button submit-btn" onClick={handlePost}>
            {postId ? "수정" : "게시"}
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
