import React from "react";
import Options from "../../utils/OptionsQA.jsx"
import Status from "../../utils/StatusQA.jsx"
import "./QuestionsOrAnswers.css";

const QuestionsOrAnswers = ({selectedOption, handleSetSelectedOption}) => {
  return (
    <div className="QuestionsOrCourses">
        <div className="d-flex">
            <button onClick={() => handleSetSelectedOption(1)} className={selectedOption === Options.questions ? Status.active : Status.inactive}> <h4>Asked</h4> </button>
            <button onClick={() => handleSetSelectedOption(2)} className={selectedOption === Options.answers ? Status.active : Status.inactive}> <h4>Answered</h4> </button>
        </div>
    </div>
  );
}

export default QuestionsOrAnswers;