import React from "react";
import "../styles/postcard.scss";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString();

  return (
    <div className="post-card">
      <div className="post-header">
        <h3 className="post-title">{post.title}</h3>
        <div className="post-meta">
          <span className="post-author">{post.author?.username || "Unknown"}</span>
          <span className="post-email">{post.author?.email || "Unknown"}</span>
          <span className="post-date">📅 {formattedDate}</span>
        </div>
      </div>

      <p className="post-excerpt">
        {post.content ? post.content.substring(0, 150) + "..." : "No content available"}
      </p>

      <Link to={`/posts/${post._id}`} className="read-more">
        Read More →
      </Link>
    </div>
  );
};

export default PostCard;
