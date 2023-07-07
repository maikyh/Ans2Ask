import React from "react";  
import "./Question.css";

export default function Question({id, user}) {
  return (
    <div className="question">
        <div className="question-card bg-white mb-4">
            <h6>
                Question #{id} - User: {user}
            </h6>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, ipsa.
            </p>
        </div>
        <div>
        </div>
    </div>
  );
}
