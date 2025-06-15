import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyPosts, deletePost } from "../features/posts/postsActions";
import "../styles/homepage.scss";
import { useNavigate } from "react-router-dom";

const MyPosts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, userPosts } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem("user"));
    console.log(user, "user name in MyPosts component");
  useEffect(() => {
    dispatch(fetchMyPosts());
  }, [dispatch]);

  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(postId)).then(() => {
        dispatch(fetchMyPosts()); // ⬅️ refetch after deletion
      });
    }
  };

  return (
    <div className="home-container">
      <h2>My Blog Posts</h2>
      <p>
        {/* Author: <strong>{user?.user?.name}</strong> ({user?.user?.email}) */}
        Author: <strong>{user?.name}</strong> ({user?.email})
      </p>

      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {userPosts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div className="posts-wrapper">
          {userPosts.map((post) => (
            <div key={post._id} className="post-card">
              <div className="post-header">
                <h3>{post.title}</h3>
                <p>
                  <small>
                    Created: {new Date(post.createdAt).toLocaleDateString()}
                  </small>
                </p>
              </div>
              <p>{post.content.slice(0, 100)}...</p>
              <button onClick={() => handleDelete(post._id)} className="delete-btn">
                Delete
              </button>
              <button onClick={() => navigate(`/edit/${post._id}`)} className="update-btn">
                Update
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
