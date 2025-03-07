import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    const response = await fetch(`/api/contents?userId=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        contents,
        is_main: isMain ? 1 : 0,
      }),
    });

    if (response.ok) {
      navigate("/main"); // 성공 시 메인 페이지로 이동
    } else {
      alert("게시 실패!");
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
          <button className="post-button cancel-btn" onClick={handleCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
