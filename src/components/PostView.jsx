import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/PostView.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PostView = ({ post, postId }) => {
  const navigate = useNavigate();

  if (!post) {
    return <div className="post-view">게시글을 선택해주세요.</div>;
  }

  const handleEdit = () => {
    navigate(`/posting`, { state: { postId } });
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/contents/${postId}`
      );
      if (response.status === 200 || response.status === 204) {
        toast.success("게시글이 삭제되었습니다.");
      } else {
        toast.error("게시글 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("게시글 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="post-view">
      <ToastContainer />
      <div className="post-title">{post.title}</div>
      <hr></hr>
      <div className="post-details">
        작성자 : {post.nickname} | 작성 시간 : {post.postTime} | 대표글 여부 :{" "}
        {post.isMain ? "O" : "X"}
      </div>
      <hr></hr>
      <div className="button-container">
        <button className="text-button" onClick={handleEdit}>
          수정
        </button>
        <button className="text-button" onClick={handleDelete}>
          삭제
        </button>
      </div>
      <div className="post-contents">{post.contents}</div>
    </div>
  );
};

PostView.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    contents: PropTypes.string,
    nickname: PropTypes.string,
    postTime: PropTypes.string,
    isMain: PropTypes.bool,
  }),
  postId: PropTypes.number.isRequired,
};

export default PostView;
