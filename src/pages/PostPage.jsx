import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Post.css";

const PostPage = ({ userId }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [isMain, setIsMain] = useState(false);

  const handleCancel = () => {
    navigate("/main");
  };

  const handlePost = async () => {
    try {
      const response = await axios.post(`/api/contents?userId=${userId}`, {
        title,
        contents,
        is_main: isMain ? 1 : 0,
      });

      if (response.status === 200) {
        navigate("/main"); // 성공 시 메인 페이지로 이동
      } else {
        alert("게시 실패!");
      }
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      alert("게시 실패! 다시 시도해주세요.");
    }
  };

  return (
    <div className="posting">
      <input
        className="post-headings"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="post-contexts"
        placeholder="Enter your context..."
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        required
      ></textarea>

      <div className="post-bottom-section">
        <input
          className="main-post-checkbox"
          type="checkbox"
          checked={isMain}
          onChange={(e) => setIsMain(e.target.checked)}
        />
        대표 글로 설정하기
        <div className="post-buttons">
          <button className="post-button submit-btn" onClick={handlePost}>
            게시
          </button>
          <button className="post-button cancel-btn" onClick={handleCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
