import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/PostView.css";

const PostView = ({ selectedPost }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedPost) return;

    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(
          `/api/contents/${selectedPost.postId}`
        );
        setPost(response.data.response);
      } catch (error) {
        console.error("게시글 정보를 불러오는 데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [selectedPost]);

  if (!selectedPost) {
    return (
      <div className="post-view">
        <p className="no-post-message">불러올 글이 없습니다!</p>
      </div>
    );
  }

  return (
    <div className="post-view">
      {loading ? (
        <p className="loading-message">불러오는 중...</p>
      ) : (
        <>
          <h2 className="post-title">{post.title}</h2>
          <p className="post-meta">
            작성자: {post.nickname} | 작성 시간: {post.postTime}
          </p>
          <div className="post-content">{post.contents}</div>
        </>
      )}
    </div>
  );
};

export default PostView;
