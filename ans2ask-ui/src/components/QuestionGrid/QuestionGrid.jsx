import React from "react";
import { useState, useEffect, useContext } from "react";
import Question from "../Question/Question";
import "./QuestionGrid.css";

export default function QuestionGrid() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:3001/questions');
      const data = await response.json();
      setQuestions(data);
    };
    fetchPosts();
  }, []);

  console.log(questions);

  return (
    <div className="QuestionGrid">
      {questions?.map((question) => (
        <div key={question.id}>
          <Question id={question.id} username={question.user.username} subject={question.subject} title={question.title} text={question.text} />
        </div>
      ))}
    </div>
  );
}