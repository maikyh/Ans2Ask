import React from "react";
import Question from "../Question/Question";
import "./QuestionGrid.css";

export default function QuestionGrid() {
  return (
    <div className="QuestionGrid">
        <div className="d-flex justify-content-center align-items-center custom-margin-home">
            <div className="custom-container-home bg-light px-4 pt-4 pb-2">
                <div className="subjects-section bg-dark mb-4"></div>

                <h1 className="text-center mb-2 fw-bold">Subject</h1>
                
                <div className="d-flex">
                  <button className="btn btn-dark w-100 d-block fw-bold mx-4 mt-4 mb-1 p-2"> <h4>Questions</h4> </button>
                  <button className="btn btn-dark w-100 d-block fw-bold mx-4 mt-4 mb-1 p-2"> <h4>Courses</h4> </button>
                </div>
                
                <div className="">
                    <Question id={1} username={"Miguel"} subject={"Subject"} />
                    <Question id={2} username={"Diego"} subject={"Subject"} />
                    <Question id={3} username={"Finn"} subject={"Subject"} />
                </div>
            </div>
        </div>
    </div>
  );
}
