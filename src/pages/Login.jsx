import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import RegisterSuccess from "../components/RegisterSuccess";

const Login = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false); // signupSuccess -> isRegistering
  const [signupSuccess, setSignupSuccess] = useState(false);

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
    <LoginForm onLogin={onLogin} />
  );
};

export default Login;
