import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  IconButton
} from '@chakra-ui/react' 
import "./UserCard.css";

import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'

export default function UserCard({ username, title, email, about, coins }) {
  return (
    <div className="UserCard card">
      <div className="card-body d-flex align-items-center">
        <FontAwesomeIcon className="fa-10x user-icon m-5" icon={faUser} />
        <div>
          <h2 className="mb-0">{username}</h2>
          <h5 className="mb-0"> {title} </h5>
          <p className="mb-0">{email}</p>
          <p className="mb-1">{coins} coins</p>
          <p>{about}</p>
        </div>
      </div>
    </div>
  );
}