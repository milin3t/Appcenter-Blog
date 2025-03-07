import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const RegisterSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="register-success-container">
      <div className="register-success-box">
        <h2 className="register-success-title">축하합니다!</h2>
        <p className="register-success-message">
          신규 회원 가입이 완료되었습니다.
        </p>
        <button
          className="register-success-button"
          onClick={() => navigate("/")}
        >
          로그인 하러 가기
        </button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
