import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 환경 변수에서 API 주소 가져오기
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5173";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API 요청 (로그인)
      const response = await axios.post(`${API_BASE_URL}/api/members/login`, {
        loginId: username,
        password: password,
      });

      // API 응답 데이터
      const { loginId } = response.data;
      console.log("서버 응답 userId:", loginId);

      if (!loginId) throw new Error("로그인 실패: 응답 데이터 없음");

      // 로그인 성공 처리
      onLogin(loginId);
      toast.success("로그인 성공!", {
        position: "top-center",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/main");
      }, 500);
    } catch (err) {
      // 백엔드에서 반환한 에러 메시지가 있으면 표시
      const errorMessage =
        err.response?.data?.message || "로그인에 실패했습니다.";
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

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
