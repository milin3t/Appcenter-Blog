import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // API 구현 부분
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/members/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("존재하지 않는 계정입니다.");
      }

      const data = await response.json();
      onLogin(username); // 토큰 대신 username을 전달
      toast.success("로그인 성공!", {
        position: "top-center",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/main");
      }, 500);
    } catch (err) {
      toast.error(err.message, { position: "top-center", autoClose: 3000 });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <span className="login-title-1">오늘도</span>
        <span className="login-title-2">기록해볼까요?</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ID"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
        <p className="signup-prompt">
          계정이 없으신가요?
          <br />
          <span className="signup-link" onClick={() => navigate("/signup")}>
            회원 가입하기
          </span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
