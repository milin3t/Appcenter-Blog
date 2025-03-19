import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/api/members/login`, {
        loginId: username,
        password: password,
      });

      const { userId, loginId, nickname } = response.data;
      if (!userId || !nickname)
        throw new Error("로그인 실패: 응답 데이터 없음");

      login(userId, loginId, nickname);

      toast.success("로그인 성공!", {
        position: "top-center",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/main");
      }, 500);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "로그인에 실패했습니다.";
      toast.error(errorMessage, { position: "top-center", autoClose: 3000 });
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

export default LoginForm;
