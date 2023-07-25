import React from "react";
import Options from "../../utils/OptionsQC.jsx";
import Status from "../../utils/StatusQC.jsx";
import "./QuestionsOrCourses.css";

const QuestionsOrCourses = ({selectedOption, handleSetSelectedOption}) => {
  return (
    <div className="QuestionsOrCourses">
      <div className="d-flex">
        <button
          onClick={() => handleSetSelectedOption(1)}
          className={selectedOption === Options.question ? Status.activeQuestions : Status.inactiveQuestions}
          data-tooltip="MOST RECENT QUESTIONS"
        >
          <h4>Questions</h4>
        </button>
        <button
          onClick={() => handleSetSelectedOption(2)}
          className={selectedOption === Options.course ? Status.activeCourses : Status.inactiveCourses}
          data-tooltip="BEST YOUTUBE COURSES (Google/Youtube Scraping)"
        >
          <h4>Courses</h4>
        </button>
      </div>
    </div>
  );
}

export default QuestionsOrCourses;