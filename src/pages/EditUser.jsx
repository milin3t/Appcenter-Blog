import React, { useState, useEffect } from "react";
import "../styles/EditUser.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = ({ loginId }) => {
  console.log(loginId);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nickname: "",
    address: "",
    birth: "",
    phone: "",
    introduce: "",
  });

  // 유저 정보 불러오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/members/${loginId}`
        );
        setForm(response.data.response);
      } catch (error) {
        console.error("유저 정보를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchUserData();
  }, [loginId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/members/${loginId}`,
        form
      );
      navigate("/main"); // 성공 시 메인 페이지로 이동
    } catch (error) {
      console.error("회원 정보 수정에 실패했습니다.", error);
    }
  };

  return (
    <div className="edit-user-container">
      <div className="edit-user-box">
        <div className="profile-section">
          <div className="profile-image-placeholder"></div>
          <p className="nickname">{form.nickname || "null"}</p>
          <span className="edit-profile-text">프로필 사진 수정하기</span>
        </div>

        <div className="user-info-layout">
          <div className="user-info-container">
            <div className="user-input-box">
              <label className="user-label">이름</label>
              <input
                type="text"
                name="nickname"
                value={form.nickname}
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
        </div>

        <div className="edit-buttons">
          <button className="edit-apply-button" onClick={handleUpdate}>
            적용
          </button>
          <button
            className="edit-cancel-button"
            onClick={() => navigate("/main")}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
