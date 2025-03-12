import React, { useState, useEffect } from "react";
import "../styles/EditUser.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = ({ userId }) => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("null"); // 닉네임 기본값 "null"
  const [form, setForm] = useState({
    nickname: "",
    address: "",
    birth: "",
    phone: "",
    introduce: "",
  });

  // ✅ 유저 정보 불러오기 (GET 요청)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/members/${userId}`);
        const userData = response.data.response;

        setNickname(userData.nickname || "null"); // 닉네임이 없으면 "null"
        setForm({
          nickname: userData.nickname || "",
          address: userData.address || "",
          birth: userData.birth || "",
          phone: userData.phone || "",
          introduce: userData.introduce || "",
        });
      } catch (error) {
        console.error("사용자 정보를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchUserData();
  }, [userId]);

  // ✅ 입력 값 변경 핸들러
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ 사용자 정보 업데이트 (PUT 요청)
  const handleUpdateUser = async () => {
    try {
      await axios.put(`/api/members/${userId}`, form);
      navigate("/main"); // 성공 시 메인 페이지로 이동
    } catch (error) {
      console.error("사용자 정보 업데이트 실패", error);
      alert("업데이트에 실패했습니다.");
    }
  };

  return (
    <div className="edit-user-container">
      <div className="edit-user-box">
        <div className="profile-section">
          <div className="profile-image-placeholder"></div>
          <p className="nickname">{nickname}</p>
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
          <button className="edit-apply-button" onClick={handleUpdateUser}>
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
