import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./UserCard.css";

export default function UserCard({ username, email }) {
  return (
    <div className="UserCard card">
      <div className="card-body d-flex align-items-center">
        <FontAwesomeIcon className="fa-10x user-icon m-5" icon={faUser} />
        <div>
          <h5 className="card-title mb-0">{username}</h5>
          <p className="card-text">{email}</p>
        </div>
      </div>
    </div>
  );
}
