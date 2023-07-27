import React from "react";
import { useState, useEffect, Suspense } from "react";
import Options from "../../utils/OptionsQC.jsx"
import { Spinner, Flex } from "@chakra-ui/react";
import PersonalizedFallback from "../PersonalizedFallback/PersonalizedFallback.jsx"
import { url, MAX_TIME, allSubjects, noQuery, nothingInLocalStorage, API_KEY } from "../../utils/Constants.jsx";
import { removeStopWords } from "../../utils/StopWords.jsx";
import Swal from 'sweetalert2';
import axios from 'axios';
import "./QuestionGrid.css";

const LazyQuestion = React.lazy(() => import('../Question/Question'));
const LazyCourse = React.lazy(() => import('../Course/Course'));

const QuestionGrid = ({ images, searchQuery, selectedOption, selectedSubject }) => {
  const [questions, setQuestions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [cosineSim, setCosineSim] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const removeCoursesFromLocalStorage = (subject) => {
    localStorage.removeItem('courses' + '/' + subject);
  };

  const removeQuestionsFromLocalStorage = () => {
    localStorage.removeItem('questions');
  };

  //For Questions
  useEffect(() => {
    const cachedQuestions = localStorage.getItem('questions');
    if (cachedQuestions && cachedQuestions.length > nothingInLocalStorage) {
      setQuestions(JSON.parse(cachedQuestions));
    }
    else {
      const fetchQuestions = async () => {
        const response = await fetch(url + '/questions');
        const data = await response.json();
        setQuestions(data);
      };

      fetchQuestions();
    }
  }, []);

  useEffect(() => {
    localStorage.removeItem('questions');
    localStorage.setItem('questions', JSON.stringify(questions));
    const timer = setTimeout(() => removeQuestionsFromLocalStorage(), MAX_TIME);
    return () => clearTimeout(timer);
  }, [questions])

  //For Courses
  useEffect(() => {
    const cachedCourses = localStorage.getItem(`courses/${selectedSubject}`)
    if (cachedCourses && cachedCourses.length > nothingInLocalStorage) {
      setCourses(JSON.parse(cachedCourses));
      setIsLoading(false);
    }
    else {
      // Create an instance of AbortController
      const abortController = new AbortController();
      let didCancel = false;

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
          const response = await fetch(url + '/google' + `/${selectedSubject}`, {
            signal: abortController.signal,
          });
          const data = await response.json();

          const filteredYoutubeVideos = data.filter(video => video.link.startsWith("https://www.youtube.com/watch?v="));

          const fetchVideoDataPromises = filteredYoutubeVideos.map(async (video) => {
            const videoDataResponse = await fetch(url + '/youtube' + `/${encodeURIComponent(video.link)}`, {
              signal: abortController.signal,
            });
            const videoData = await videoDataResponse.json();

            let searchData;
            const searchResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${transformString(video.title)}+Courses&type=video&key=${API_KEY}`, {
              signal: abortController.signal,
            });
            if (searchResponse.ok === true) {
              searchData = await searchResponse.json();
            } else {
              let check = {
                items: [{ id: { videoId: getVideoIdFromUrl(video.link) } }]
              };
              searchData = check;
            }

            return {
              ...videoData,
              videoDetails: searchData.items.length > 0 ? searchData.items[0] : null,
            };
          });

          const videoDataArray = await Promise.all(fetchVideoDataPromises);

          if (!didCancel) {
            setCourses(videoDataArray);
            setIsLoading(false);
          }
        } catch (error) {
          if (!didCancel) {
            setIsLoading(false);
          }
        }
      };

      if (selectedOption === Options.course) {
        fetchCourses();
      }
      else {
        setIsLoading(false);
      }

      return () => {
        didCancel = true;
        abortController.abort();
      };
    }
  }, [selectedOption, selectedSubject]);

  useEffect(() => {
    localStorage.removeItem(`courses/${selectedSubject}`);
    localStorage.setItem(`courses/${selectedSubject}`, JSON.stringify(courses));
    const timer = setTimeout(() => removeCoursesFromLocalStorage(selectedSubject), MAX_TIME);
    return () => clearTimeout(timer);
  }, [courses])

  function getContent() {
    if (searchQuery.length !== noQuery) {
      const sentence = removeStopWords(searchQuery);

      function getRatedQuestions () {
          const rating = {};
          for(const question of questions){
            const mapOfWordsOfCurrentQuestion = question.mapOfWords;
            let currentRating = 0;
            const currentSetence = removeStopWords(sentence).split(' ');
            for(const word of currentSetence){
                if(mapOfWordsOfCurrentQuestion[word]){
                    currentRating = currentRating + mapOfWordsOfCurrentQuestion[word];
                }
            }

            const data = {
              'sentence1': searchQuery,
              'sentence2': question.body
            };

            axios.post('http://127.0.0.1:5000/checkCosineSimilarity', data)
              .then((response) => {
                setCosineSim(response.data.result);
            })
            .catch((error) => {
              console.error('Error:', error);
            });

            rating[question.id] = currentRating * 3 + question.clicks + cosineSim * 2;
          }
          return rating;
      }

      const ratedQuestions = getRatedQuestions();
      console.log(ratedQuestions);

      const questionsSorted = [...questions];
      questionsSorted.sort(function(a,b){
        return ratedQuestions[a.id] < ratedQuestions[b.id] ? 1 : -1;
      });

      return questionsSorted;
    }
    if (selectedOption === Options.course) return courses;
    if (selectedSubject !== allSubjects) return questions.filter(question => question.subject === selectedSubject);
    return questions;
  }

  let content = getContent();

  const handleOnClick = async (questionId) => {
    try {
      // Make the question API request
        const response = await fetch(url + `/questions` + `/${questionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
    } catch (error) {
      // Handle any network or API request errors
      Swal.fire({
        icon: 'error',
        title: 'User Interaction Failed: ' + error,
        text: "Invalid OnClick. Please try again."
      });
    }
  };

  return (
    <div className="QuestionGrid">
      {isLoading === false && selectedOption === Options.question &&
        content?.map((question) => (
          <div onClick={() => handleOnClick(question.id)} key={question.id}>
            <Suspense fallback={<PersonalizedFallback />}>
              <LazyQuestion sentence={removeStopWords(searchQuery)} images={images} id={question.id} username={question.user.username} email={question.user.email} userTitle={question.user.title} subject={question.subject} title={question.title} body={question.body} coins={question.coins} />
            </Suspense>
          </div>
        ))
      }

      {isLoading === false && selectedOption === Options.course && (
        <div className="d-flex flex-column align-items-center">
          {content?.map((video) => (
            <Suspense fallback={<PersonalizedFallback />}>
              <LazyCourse video={video} />
            </Suspense>
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

export default QuestionGrid;