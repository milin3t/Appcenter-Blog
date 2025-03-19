import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import RegisterSuccess from "../components/RegisterSuccess";

const Login = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false); // 회원가입 상태
  const [signupSuccess, setSignupSuccess] = useState(false); // 회원가입 성공 여부

  if (signupSuccess) {
    return (
      <RegisterSuccess
        onGoToLogin={() => {
          setSignupSuccess(false);
          setIsRegistering(false); // 회원가입 완료 후 로그인 화면으로 이동
        }}
      />
    );
  }

  return isRegistering ? (
    <RegisterForm onSignupSuccess={() => setSignupSuccess(true)} />
  ) : (
    <LoginForm onLogin={onLogin} onRegister={() => setIsRegistering(true)} />
  );
};

export default Login;
