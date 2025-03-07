import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../styles/Register.css";
import axios from "axios";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { username, password, confirmPassword, nickname } = form;

    if (!username || !password || !confirmPassword || !nickname) {
      toast.error("모든 정보를 입력해주세요.", {
        position: "top-center",
        autoClose: 3000,
      });
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("비밀번호가 일치하지 않습니다.", {
        position: "top-center",
        autoClose: 3000,
      });
      return false;
    }

    if (
      password.length < 8 ||
      !/[A-Za-z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      toast.error("비밀번호는 최소 8자, 영문, 숫자를 포함해야 합니다.", {
        position: "top-center",
        autoClose: 3000,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const { data } = await axios.post("/api/members/signup", {
        loginId: form.username,
        password: form.password,
        nickname: form.nickname,
      });

      navigate("/register-success");
    } catch (err) {
      toast.error("회원가입 실패했습니다.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">회원 가입</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="아이디를 입력해주세요"
            className="register-input"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            className="register-input"
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호를 다시 입력해주세요"
            className="register-input"
            onChange={handleChange}
          />
          <input
            type="text"
            name="nickname"
            placeholder="닉네임을 입력해주세요"
            className="register-input"
            onChange={handleChange}
          />
          <button type="submit" className="register-button">
            가입
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/")}
          >
            취소
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
