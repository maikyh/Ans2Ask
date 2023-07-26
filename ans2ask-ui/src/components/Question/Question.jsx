import React from "react";  
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { url } from "../../utils/Constants.jsx";
import Highlighter from "react-highlight-words";
import "./Question.css";

const MAX_LENGTH = 369;

const Question = ({sentence, images, id, username, email, userTitle, subject, title, body, coins}) => {
  const [answers, setAnswers] = useState([]);

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
      <div style={{border: '0.9px solid gray' }} className="question-card bg-white mt-4 p-3">
        <div className="row">
          <div className="col-auto">
            <div className='preview-container' style={{width: "32px", height: "32px", marginBottom: "8px"}}>
              {image && image[0] && image[0].url && 
                <img className='preview-image' src={image[0].url} alt="profilePicture" />
              }
            </div>
          </div>

          <div className="col-auto">
            <h6 className="mt-1"> {username} </h6>
          </div>

          <div className="col-auto"> <h6 className="mt-1"> - </h6> </div>

          <div className="col-auto">
            <h6 className="mt-1" style={{ fontStyle: "italic" }}> {userTitle} </h6>
          </div>

          <div className="col-auto"> <h6 className="mt-1"> - </h6> </div>

          <div className="col-auto">
            <h6 className="mt-1 underline-text"> {subject} </h6>
          </div>
          <div>

          </div>
        </div>
        <div>
          <span className="fw-bold">{title}</span>
        </div>
        <div className="">
          <div style={{marginBottom:"10px"}}>
            <Highlighter
              highlightClassName="YourHighlightClass"
              searchWords={sentence ? sentence.split(' ') : []}
              autoEscape={true}
              textToHighlight={truncateText(body)}
            />
          </div>
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