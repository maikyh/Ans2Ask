import React from "react";  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./Question.css";

export default function Question({id, username, subject}) {
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
          <span className="fw-bold">Lorem ipsum dolor sit amet consectetur.</span>
        </div>
        <div className="">
          <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim ducimus, blanditiis veniam tempore, animi porro perferendis eaque sequi laboriosam, illo ad adipisci praesentium eveniet temporibus suscipit? Fuga velit est non corrupti odio neque, molestias veritatis. Esse dicta nemo quis velit? Ex veritatis voluptates eaque corrupti. </p>
        </div>
      </div>
    </div>
  );
}
