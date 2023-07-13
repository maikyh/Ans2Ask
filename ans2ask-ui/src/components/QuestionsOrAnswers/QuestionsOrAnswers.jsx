import React from "react";
import "./QuestionsOrAnswers.css";

export default function QuestionsOrAnswers({selectedOption, handleSetSelectedOption}) {
  const active = "btn btn-dark w-100 d-block fw-bold mx-4 mt-4 mb-1 p-2";
  const inactive = "btn btn-outline-dark w-100 d-block fw-bold mx-4 mt-4 mb-1 p-2";

  return (
    <div className="QuestionsOrCourses">
        <div className="d-flex">
            <button onClick={() => handleSetSelectedOption(1)} className={selectedOption === 1 ? active : inactive}> <h4>Questions</h4> </button>
            <button onClick={() => handleSetSelectedOption(2)} className={selectedOption === 1 ? inactive : active}> <h4>Answers</h4> </button>
        </div>
    </div>
  );
}
