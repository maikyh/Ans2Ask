import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./UserCard.css";

export default function UserCard({username, email}) {

  return (
    <div className="UserCard">
        <div className="d-flex">
            <FontAwesomeIcon className="fa-10x" icon={faUser} />
                {username}
                {email}
        </div>
    </div>
  );
}
