import React from "react";
import "./QuestionsOrCourses.css";

export default function QuestionsOrCourses() {
  return (
    <div className="QuestionsOrCourses">
        <div className="d-flex">
            <button className="btn btn-dark w-100 d-block fw-bold mx-4 mt-4 mb-1 p-2"> <h4>Questions</h4> </button>
            <button className="btn btn-outline-dark w-100 d-block fw-bold mx-4 mt-4 mb-1 p-2"> <h4>Courses</h4> </button>
        </div>
    </div>
  );
}
