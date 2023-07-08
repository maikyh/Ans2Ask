import React from "react";
import Question from "../Question/Question";
import "./QuestionGrid.css";

export default function QuestionGrid() {
  return (
    <div className="QuestionGrid">
        <Question id={1} username={"Miguel"} subject={"Subject"} />
        <Question id={2} username={"Diego"} subject={"Subject"} />
        <Question id={3} username={"Finn"} subject={"Subject"} />
    </div>
  );
}
