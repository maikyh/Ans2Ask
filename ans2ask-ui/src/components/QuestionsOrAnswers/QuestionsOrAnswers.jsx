import React, { useContext } from 'react';
import Options from "../../utils/OptionsQA.jsx"
import { UserContext } from "../../UserContext.js";
import { StatusL, StatusD } from "../../utils/StatusQC.jsx";
import "./QuestionsOrAnswers.css";

const QuestionsOrAnswers = ({selectedOption, handleSetSelectedOption}) => {
  const { darkMode } = useContext(UserContext);
    console.log(selectedOption);
  return (
    <div className="QuestionsOrCourses">
        <div className="d-flex">
            <button onClick={() => handleSetSelectedOption(1)} className={ !darkMode ? selectedOption === Options.questions ? StatusL.activeQuestions : StatusL.inactiveQuestions : selectedOption === Options.questions ? StatusD.activeQuestions : StatusD.inactiveQuestions}> <h4>Asked</h4> </button>
            <button onClick={() => handleSetSelectedOption(2)} className={ !darkMode ? selectedOption === Options.answers ? StatusL.activeCourses : StatusL.inactiveCourses : selectedOption === Options.answers ? StatusD.activeCourses : StatusD.inactiveCourses}> <h4>Answered</h4> </button>
        </div>
    </div>
  );
}

export default QuestionsOrAnswers;