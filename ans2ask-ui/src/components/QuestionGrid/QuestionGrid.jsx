import React from "react";
import { useState, useEffect } from "react";
import Question from "../Question/Question";
import Course from "../Course/Course"
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
    function transformString(originalString) {
      var transformedString = originalString.replace(/ /g, '+');
      return transformedString;
    }

    function getVideoIdFromUrl(url) {
      var regex = /[?&]v=([^&#]*)/;
      var match = url.match(regex);
      if (match && match[1]) {
        return match[1];
      } else {
        return null;
      }
    }

    const fetchCourses = async () => {
      setIsLoading(true);
  
      try {
        const response = await fetch(url + '/google' + `/${selectedSubject}`);
        const data = await response.json();
  
        const filteredYoutubeVideos = data.filter(course => course.links.startsWith("https://www.youtube.com/watch?v="));
  
        const fetchVideoDataPromises = filteredYoutubeVideos.map(async (video) => {
          const videoDataResponse = await fetch(url + '/youtube' + `/${encodeURIComponent(video.links)}`);
          const videoData = await videoDataResponse.json();
          
          let searchData;
          const searchResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${transformString(video.title)}+Courses&type=video&key=AIzaSyDxpVm_ulyGpjBUXnDT1A0QfLT_bBQU1HI`);
          if(searchResponse.ok === true){
            searchData = await searchResponse.json();
          }
          else{
            let check = {
              items: [{ id: { videoId: getVideoIdFromUrl(video.links) } }]
            };
            searchData = check;
          }
          
  
          return {
            ...videoData,
            videoDetails: searchData.items[0]
          };
        });
  
        const videoDataArray = await Promise.all(fetchVideoDataPromises);
        setCourses(videoDataArray);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (selectedOption === Options.course) {
      fetchCourses();
    }
  }, [selectedOption, selectedSubject]);
  
  
  function getContent() {
    if(searchQuery.length !== noQuery){
      let currentContent = questions.filter(question => {
        const titleMatches = question.title.toLowerCase().includes(searchQuery.toLowerCase());
        const textMatches = question.body.toLowerCase().includes(searchQuery.toLowerCase());
        return titleMatches || textMatches;
      });
      return currentContent; 
    }
    if(selectedOption === Options.course) return courses;
    if(selectedSubject !== allSubjects) return questions.filter(question => question.subject === selectedSubject);
    return questions;
  }

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
          {content?.map((video) => (
            <Course video={video} />
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