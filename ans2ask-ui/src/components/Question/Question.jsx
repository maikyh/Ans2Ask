import React from "react";  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./Question.css";

export default function Question({id, username, subject, title, text}) {
  return (
    <div className="question">
      <div className="question-card bg-white mt-4 p-3">
        <div className="row">
          <div className="col-auto">
            <FontAwesomeIcon icon={faUser} />
          </div>

          <div className="col-auto">
            <h6 className="mt-1"> {username} </h6>
          </div>

          <div className="col-auto"> <h6 className="mt-1"> - </h6> </div>

          <div className="col-auto">
            <h6 className="mt-1"> {subject} </h6>
          </div>
          <div>

          </div>
        </div>
        <div>
          <span className="fw-bold">{title}</span>
        </div>
        <div className="">
          <p> {text} </p>
        </div>
      </div>
    </div>
  );
}