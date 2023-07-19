import React from "react";
import { useState, useEffect, useContext } from "react";
import Question from "../Question/Question";
import Options from "../../utils/OptionsQC.jsx"
import { Spinner, Flex } from "@chakra-ui/react";
import "./QuestionGrid.css";

const url = `http://localhost:3001`;

//Subjects
const allSubjects = "All";

//Query on search
const noQuery = 0;

export default function QuestionGrid({searchQuery, selectedOption, selectedSubject}) {
  const [questions, setQuestions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      const response = await fetch(url + '/google' + `/${selectedSubject}`);
      const data = await response.json();
  
      const filteredYoutubeVideos = data.filter(course => course.links.startsWith("https://www.youtube.com/watch?v="));
  
      const fetchVideoDataPromises = filteredYoutubeVideos.map(video => fetch(url + '/youtube' + `/${encodeURIComponent(video.links)}`));
      const responses = await Promise.all(fetchVideoDataPromises);
      const videoDataArray = await Promise.all(responses.map(response => response.json()));
  
      setCourses(videoDataArray);
    };

    if (selectedOption === Options.course) {
      setIsLoading(true);
      fetchCourses().then(() => setIsLoading(false));
    }
  }, [selectedOption]);
  
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
  
  console.log(courses);
  console.log(isLoading);

  let content = getContent();

  return (
    <div className="QuestionGrid">
      {isLoading === false &&  selectedOption === Options.question && 
        content?.map((question) => (
          <div key={question.id}>
            <Question id={question.id} username={question.user.username} subject={question.subject} title={question.title} body={question.body} coins={question.coins} />
          </div>
        ))
      }

      {isLoading === false && selectedOption === Options.course && (
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

      {
        isLoading === true && 
        <Flex
          height="460px"
          alignItems="center"
          justifyContent="center"
        >
          {isLoading && (
            <Spinner
              thickness="8px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              w="24" h="24"
            />
          )}
        </Flex>
      }
  
    </div>
  );
}