import React, { useContext } from 'react';
import Options from "../../utils/OptionsQC.jsx";
import { UserContext } from "../../UserContext.js";
import { StatusL, StatusD } from "../../utils/Status.jsx";
import "./QuestionsOrCourses.css";

const QuestionsOrCourses = ({ selectedOption, handleSetSelectedOption }) => {
    const { darkMode } = useContext(UserContext);

    return (
        <div className="QuestionsOrCourses">
            <div className="d-flex">
                <button
                    onClick={() => handleSetSelectedOption(1)}
                    className={!darkMode ? selectedOption === Options.question ? StatusL.activeQuestions : StatusL.inactiveQuestions : selectedOption === Options.question ? StatusD.activeQuestions : StatusD.inactiveQuestions}
                    data-tooltip="Most Recent Questions"
                >
                    <h4>Questions</h4>
                </button>
                <button
                    onClick={() => handleSetSelectedOption(2)}
                    className={!darkMode ? selectedOption === Options.course ? StatusL.activeCourses : StatusL.inactiveCourses : selectedOption === Options.course ? StatusD.activeCourses : StatusD.inactiveCourses}
                    data-tooltip="Out of coins? Watch the Best Free Youtube Courses!"
                >
                    <h4>Courses</h4>
                </button>
            </div>
        </div>
    );
}

export default QuestionsOrCourses;