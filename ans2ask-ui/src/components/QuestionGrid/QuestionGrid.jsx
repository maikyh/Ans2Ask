import React from "react";
import { useState, useEffect, useContext } from "react";
import Question from "../Question/Question";
import "./QuestionGrid.css";

export default function QuestionGrid({selectedSubject}) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:3001/questions');
      const data = await response.json();
      setQuestions(data);
    };
    fetchPosts();
  }, []);

  let filteredQuestions;
  if(selectedSubject !== "All"){
    filteredQuestions = questions.filter(question => question.subject === selectedSubject);
    console.log(filteredQuestions);
  }
  else {
    filteredQuestions = questions;
  }

  //console.log(questions);

  return (
    <div className="QuestionGrid">
      {filteredQuestions?.map((question) => (
        <div key={question.id}>
          <Question id={question.id} username={question.user.username} subject={question.subject} title={question.title} text={question.text} />
        </div>
      ))}
    </div>
  );
}