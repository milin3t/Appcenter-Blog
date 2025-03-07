import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import RegisterSuccess from "../components/RegisterSuccess";

const Login = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  if (signupSuccess) {
    return (
      <RegisterSuccess
        onGoToLogin={() => {
          setSignupSuccess(false);
          setIsRegistering(false);
        }}
      />
    );
  }

  return isRegistering ? (
    <RegisterForm onSignupSuccess={() => setSignupSuccess(true)} />
  ) : (
    <LoginForm
      onLogin={onLogin}
      onNavigateToSignup={() => setIsRegistering(true)}
    />
  );
};

export default Login;
