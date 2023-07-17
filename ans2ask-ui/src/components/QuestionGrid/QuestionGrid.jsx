import React from "react";
import { useState, useEffect, useContext } from "react";
import Question from "../Question/Question";
import Options from "../../utils/OptionsQC.jsx"
import "./QuestionGrid.css";

const url = `http://localhost:3001`;

//Subjects
const allSubjects = "All";

//Query on search
const noQuery = 0;

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

  function getContent() {
    if(searchQuery.length !== noQuery){
      let currentContent = questions.filter(question => {
        const titleMatches = question.title.toLowerCase().includes(searchQuery.toLowerCase());
        const textMatches = question.body.toLowerCase().includes(searchQuery.toLowerCase());
        return titleMatches || textMatches;
      });
      return currentContent; 
    }
    if(selectedOption === Options.course) return courses.items;
    if(selectedSubject !== allSubjects) return questions.filter(question => question.subject === selectedSubject);
    return questions;
  }

  let content = getContent();

  return (
    <div className="QuestionGrid">
      {selectedOption === Options.question && 
        content?.map((question) => (
          <div key={question.id}>
            <Question id={question.id} username={question.user.username} subject={question.subject} title={question.title} body={question.body} coins={question.coins} />
          </div>
        ))
      }

      {selectedOption === Options.course && (
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