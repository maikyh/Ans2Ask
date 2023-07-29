import React from "react";  
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../UserContext.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { url } from "../../utils/Constants.jsx";
import Highlighter from "react-highlight-words";
import "./Question.css";

const MAX_LENGTH = 369;

const Question = ({sentence, images, id, username, email, userTitle, subject, title, body, coins}) => {
  const [answers, setAnswers] = useState([]);
  const { darkMode } = useContext(UserContext);

  const image = images.filter(image => image.public_id === email);

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
      <div style={{ backgroundColor: darkMode ? "#2D3748" : "rgba(248,249,250,1)", border: '0.9px solid gray' }} className="question-card mt-4 p-3">
        <div className="row">
          <div className="col-auto">
            <div className='preview-container' style={{width: "32px", height: "32px", marginBottom: "8px"}}>
              {image && image[0] && image[0].url && 
                <img className='preview-image' src={image[0].url} alt="profilePicture" />
              }
            </div>
          </div>

          <div className="col-auto" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}>
            <h6 className="mt-1" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}> {username} </h6>
          </div>

          <div className="col-auto" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}> <h6 className="mt-1"> - </h6> </div>

          <div className="col-auto">
            <h6 className="mt-1" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)", fontStyle: "italic" }}> {userTitle} </h6>
          </div>

          <div className="col-auto" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}> <h6 className="mt-1"> - </h6> </div>

          <div className="col-auto">
            <h6 className="mt-1 underline-text" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}> {subject} </h6>
          </div>
          <div>

          </div>
        </div>
        <div>
          <span className="fw-bold" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}>{title}</span>
        </div>
        <div className="">
          <div style={{marginBottom:"10px"}}>
            <Highlighter
              style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}
              highlightClassName="YourHighlightClass"
              searchWords={sentence ? sentence.split(' ') : []}
              autoEscape={true}
              textToHighlight={truncateText(body)}
            />
          </div>
          {
            answersOfCurrentQuestion.length > 0 && 
            <div className="position-absolute bottom-0 end-0 p-1 px-3 underline-text" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}>
                {answersOfCurrentQuestion.length} answers
            </div>
          }
          {
            answersOfCurrentQuestion.length == 0 && 
            <div className="position-absolute bottom-0 end-0 p-1 px-3 underline-text" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}>
                No answers, be the first!
            </div>
          }
        </div>
        <div class="">
          <div class="position-absolute top-0 end-0 p-1 px-3 text-danger fw-bold">
            {coins} coins
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;