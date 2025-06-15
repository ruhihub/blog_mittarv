import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/posts/postsActions";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";
import "../styles/homepage.scss";

const Home = () => {
  const dispatch = useDispatch();
  const { posts = [], loading, error } = useSelector((state) => state.posts);
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const filteredItems = useMemo(() => {
    return posts.filter((post) =>
      post.title?.toLowerCase().includes(query.toLowerCase()) ||
      post.content?.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, posts]);
  // const token = localStorage.getItem("token");
  console.log(localStorage, "token in createPost action");
  return (
    <div className="home-container">
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="search-container">
        <input
          type="text"
          placeholder="Search posts by title or content..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="posts-wrapper">
        {filteredItems.length > 0 ? (
          filteredItems.map((post) => (
            <PostCard key={post._id} post={post} />
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>

      <Link to="/create" className="floating-button">
        <span className="plus-icon">+</span>
        <span className="button-text">Create Blog</span>
      </Link>
    </div>
  );
};

export default Home;
