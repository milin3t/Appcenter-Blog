import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/PostView.css";

const PostView = ({ post }) => {
  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
    if (post) {
      const fetchPostDetails = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/contents/${post.postId}`
          );
          setPostDetails(response.data.response);
        } catch (error) {
          console.error("게시글을 불러오는 데 실패했습니다.", error);
        }
      };

      fetchPostDetails();
    }
  }, [post]);

  if (!postDetails) {
    return <div className="post-placeholder">불러올 글이 없습니다!</div>;
  }

  return (
    <div className="post-view">
      <h2 className="post-title">{postDetails.title}</h2>
      <p className="post-author">
        작성자: {postDetails.nickname} | 작성 시간: {postDetails.postTime}
      </p>
      <div className="post-content">{postDetails.contents}</div>
    </div>
  );
};

export default PostView;
