import React, { useState } from "react";
import "../styles/EditUser.css";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "홍길동",
    address: "인천광역시 연수구 연수동",
    birth: "2001년 04월 20일",
    phone: "010-1234-5678",
    introduce: "",
  });
  const handleToMain = () => navigate("/main");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="edit-user-container">
      <div className="edit-user-box">
        <div className="profile-section">
          <div className="profile-image-placeholder"></div>
          <p className="nickname">${"{nickName}"}</p>
          <span className="edit-profile-text">프로필 사진 수정하기</span>
        </div>

        <div className="user-info-container">
          <div className="user-input-box">
            <label className="user-label">이름</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="user-edit-input"
            />
          </div>
          <div className="user-input-box">
            <label className="user-label">거주지</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="user-edit-input"
            />
          </div>
          <div className="user-input-box">
            <label className="user-label">생년월일</label>
            <input
              type="text"
              name="birth"
              value={form.birth}
              onChange={handleChange}
              className="user-edit-input"
            />
          </div>
          <div className="user-input-box">
            <label className="user-label">전화번호</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="user-edit-input"
            />
          </div>
        </div>

        <div className="intro-section">
          <label className="intro-label">자기소개</label>
          <textarea
            name="introduce"
            value={form.introduce}
            onChange={handleChange}
            className="intro-textarea"
            placeholder="자기소개를 입력해 주세요..."
          ></textarea>
        </div>

        <div className="edit-buttons">
          <button className="apply-button">적용</button>
          <button className="cancel-button" onClick={handleToMain}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
