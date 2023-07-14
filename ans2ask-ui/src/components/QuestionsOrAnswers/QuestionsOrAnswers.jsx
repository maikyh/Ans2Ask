import React from "react";
import "./QuestionsOrAnswers.css";

//Options
const Options = {
  active: "btn btn-dark w-100 d-block fw-bold mx-4 mt-0 mb-1 p-2",
  inactive: "btn btn-outline-dark w-100 d-block fw-bold mx-4 mt-0 mb-1 p-2",  
  questions: 1,
  answers: 2    
}

export default function QuestionsOrAnswers({selectedOption, handleSetSelectedOption}) {
  return (
    <div className="QuestionsOrCourses">
        <div className="d-flex">
            <button onClick={() => handleSetSelectedOption(1)} className={selectedOption === Options.questions ? Options.active : Options.inactive}> <h4>Asked</h4> </button>
            <button onClick={() => handleSetSelectedOption(2)} className={selectedOption === Options.answers ? Options.active : Options.inactive}> <h4>Answered</h4> </button>
        </div>
    </div>
  );
}
