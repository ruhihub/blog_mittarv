import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to your blog account</p>

        <input
          className="login-input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="login-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="login-button" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <Link to="/register">Register for free !</Link>
        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
