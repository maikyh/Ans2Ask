import React from "react";
import { useState, useEffect, useContext } from "react";
import Question from "../Question/Question";
import "./QuestionGrid.css";

const url = `http://localhost:3001`;

export default function QuestionGrid({searchQuery, selectedOption, selectedSubject}) {
  const [questions, setQuestions] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(url + '/questions');
      const data = await response.json();
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${selectedSubject}+Courses&type=video&key=AIzaSyDxpVm_ulyGpjBUXnDT1A0QfLT_bBQU1HI`);
      const data = await response.json();
      setCourses(data);
    };

    fetchCourses();
  }, [selectedSubject]);

  let content;
  if(searchQuery.length === 0){
    if(selectedOption === 1){
      if(selectedSubject !== "All"){
        content = questions.filter(question => question.subject === selectedSubject);
      }
      else {
        content = questions;
      }
    }
    else{
      content = courses.items;
    }
  }
  else{
    content = questions.filter(question => {
      const titleMatches = question.title.toLowerCase().includes(searchQuery.toLowerCase());
      const textMatches = question.text.toLowerCase().includes(searchQuery.toLowerCase());
      return titleMatches || textMatches;
    });
  }

  return (
    <div className="QuestionGrid">
      {selectedOption === 1 && 
        content?.map((question) => (
          <div key={question.id}>
            <Question id={question.id} username={question.user.username} subject={question.subject} title={question.title} text={question.text} />
          </div>
        ))
      }

      {selectedOption === 2 && (
        <div className="d-flex flex-column align-items-center">
          {content?.map((course) => (
            <div key={course.id.videoId} className="my-2">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${course.id.videoId}`}
                title="YouTube Video Player"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}