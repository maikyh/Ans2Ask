import React from "react";  
import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./Question.css";

const url = `http://localhost:3001`;

const MAX_LENGTH = 370;

export default function Question({id, username, subject, title, body}) {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      const response = await fetch(url + '/answers');
      const data = await response.json();
      setAnswers(data);
    };

    fetchAnswers();
  }, []);

  const answersOfCurrentQuestion = (answers.filter(answer => answer.questionId == id))

  const navigate = useNavigate();

  const handleNavigateToQuestionDetails = () => {
    navigate(`/question/${id}`);
  }

  function truncateText(body) {
    if (body.length > MAX_LENGTH) return body.substring(0, MAX_LENGTH) + "...";
    return body;
  }
  
  return (
    <div style={{ cursor: 'pointer', position: 'relative' }} className="question" onClick={() => handleNavigateToQuestionDetails(id)}>
      <div style={{border: '0.9px solid gray' }} className="question-card bg-white mt-4 p-3">
        <div className="row">
          <div className="col-auto">
            <FontAwesomeIcon icon={faUser} />
          </div>

          <div className="col-auto">
            <h6 className="mt-1"> {username} </h6>
          </div>

          <div className="col-auto"> <h6 className="mt-1"> - </h6> </div>

          <div className="col-auto">
            <h6 className="mt-1"> {subject} </h6>
          </div>
          <div>

          </div>
        </div>
        <div>
          <span className="fw-bold">{title}</span>
        </div>
        <div className="">
          <p> {truncateText(body)} </p>
          {
            answersOfCurrentQuestion.length > 0 && 
            <div className="position-absolute bottom-0 end-0 p-1 px-3 text-dark underline-text">
                {answersOfCurrentQuestion.length} answers
            </div>
          }
          {
            answersOfCurrentQuestion.length == 0 && 
            <div className="position-absolute bottom-0 end-0 p-1 px-3 text-dark underline-text">
                No answers, be the first!
            </div>
          }
        </div>
      </div>
    </div>
  );
}