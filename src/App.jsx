import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import EditUser from "./pages/EditUser";
import RegisterForm from "./components/RegisterForm";
import RegisterSuccess from "./components/RegisterSuccess";
import Feed from "./pages/Feed";
import "./App.css";
import PostPage from "./pages/PostPage";

const App = () => {
  const [loginId, setLoginId] = useState("");

  const handleLogin = (id) => {
    setLoginId(id);
  };

  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/register-success" element={<RegisterSuccess />} />
          <Route path="/main" element={<MainPage loginId={loginId} />} />
          <Route path="/posting" element={<PostPage />} />
          <Route path="/edit-user" element={<EditUser />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

// import React, { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Login from "./pages/Login";
// import MainPage from "./pages/MainPage";
// import RegisterForm from "./components/RegisterForm";
// import RegisterSuccess from "./components/RegisterSuccess";
// import "./App.css";

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userId, setUserId] = useState(""); // 아이디 저장

//   const handleLogin = (id) => {
//     setUserId(id);
//     setIsAuthenticated(true);
//   };

//   return (
//     <div className="app-container">
//       <Router>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               isAuthenticated ? (
//                 <Navigate to="/main" />
//               ) : (
//                 <Login onLogin={handleLogin} />
//               )
//             }
//           />
//           <Route path="/signup" element={<RegisterForm />} />
//           <Route path="/register-success" element={<RegisterSuccess />} />
//           <Route
//             path="/main"
//             element={
//               isAuthenticated ? (
//                 <MainPage userId={userId} />
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//         </Routes>
//       </Router>
//     </div>
//   );
// };

// export default App;
