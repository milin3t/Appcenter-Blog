import "../styles/Post.css";

const PostPage = () => {
  return (
    <div className="posting">
      <input
        className="post-headings"
        type="text"
        placeholder="Title"
        required
      />
      <textarea
        className="post-contexts"
        placeholder="Enter your contexts..."
        required
      ></textarea>
    </div>
  );
};

export default PostPage;
