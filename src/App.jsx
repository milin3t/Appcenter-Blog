import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginForm from "./components/LoginForm";
import MainPage from "./pages/MainPage";
import RegisterForm from "./components/RegisterForm";
import RegisterSuccess from "./components/RegisterSuccess";
import EditUser from "./pages/EditUser";
import PostPage from "./pages/PostPage";
import Feed from "./pages/Feed";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/register-success" element={<RegisterSuccess />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/edit-user" element={<EditUser />} />
          <Route path="/posting" element={<PostPage />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
