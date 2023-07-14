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
          <h5 className="mb-0">{username}</h5>
          <h6 className="mb-0"> MetaU Intern </h6>
          <p className="mb-2">{email}</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus sint et beatae laboriosam magnam quibusdam! Praesentium atque ullam, laudantium commodi numquam iure unde voluptatem veniam dolor magnam minus quo odit enim, natus debitis sit, eum doloremque dolore possimus veritatis totam? Error, reprehenderit similique! Sit excepturi velit accusamus culpa temporibus? Doloremque?</p>
        </div>
      </div>
    </div>
  );
}
