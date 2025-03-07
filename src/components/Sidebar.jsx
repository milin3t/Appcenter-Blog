import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Sidebar.css";

const Sidebar = ({ userId, onSelectPost }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(
          `/api/contents/category?userId=${userId}`
        );
        setPosts(response.data.response || []);
      } catch (error) {
        console.error("게시글을 불러오는 데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  return (
    <div className="sidebar-box">
      {loading ? (
        <p className="loading-message">불러오는 중...</p>
      ) : posts.length > 0 ? (
        <>
          <h3 className="sidebar-title">내 게시물</h3>
          <ul className="post-list">
            {posts.map((post) => (
              <li
                key={post.postId}
                className="post-item"
                onClick={() => onSelectPost(post)}
              >
                {post.title}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="no-posts">불러올 글이 없습니다!</p>
      )}
    </div>
  );
};

export default Sidebar;
