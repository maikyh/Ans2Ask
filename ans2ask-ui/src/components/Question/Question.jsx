import React from "react";  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import "./Question.css";

export default function Question({id, username, subject}) {
  return (
    <div className="question">
      <div className="question-card bg-white mb-4 p-3">
        <div className="row">
          <div className="col-auto">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="col-auto">
            <h6 className="mt-1"> {username} </h6>
          </div>
          <div>
            <h6 className="" ></h6>
          </div>
          <div>

          </div>
        </div>
        <div className="col-auto">
          <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, nulla sed perspiciatis eligendi quisquam similique temporibus eos recusandae illo earum, soluta optio quas. Similique, non! Dolorum, laudantium? Distinctio veritatis aliquam sequi voluptates odio eveniet nisi, similique fuga culpa ex assumenda cupiditate id, deleniti modi vitae corporis sapiente? Eum dolores doloremque pariatur ratione, distinctio modi et nostrum vitae eveniet qui dolore? </p>
        </div>
      </div>
    </div>
  );
}
