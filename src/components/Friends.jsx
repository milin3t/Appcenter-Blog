import React from "react";
import PropTypes from "prop-types";
import "../styles/Friends.css";
import profile from "../assets/profile.png";

const Friends = ({ users }) => {
  return (
    <div className="friends-container">
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.userId} className="user-item">
            <div className="friends-user-profile-placeholder">
              <img
                src={profile}
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              ></img>
            </div>
            <span className="friends-user-name">{user.nickname}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

Friends.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      nickname: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Friends;
