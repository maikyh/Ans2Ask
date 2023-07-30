import React from "react";  
import { useState, useEffect, useContext, Suspense, useMemo } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Answer from "../Answer/Answer.jsx";
import Swal from 'sweetalert2';
import PersonalizedFallback from "../PersonalizedFallback/PersonalizedFallback.jsx";
import { url, MAX_TIME, nothingInLocalStorage } from "../../utils/Constants.jsx";
import "./QuestionDetails.css";

const LazyNavBar = React.lazy(() => import('../Navbar/Navbar'));
const LazyFooter = React.lazy(() => import('../Footer/Footer'));

const QuestionDetails = ({images, handleSetSearchQuery}) => {
    const [question, setQuestion] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [userFromQuestion, setUserFromQuestion] = useState([]);
    const [FinishStatus, setFinishStatus] = useState(false);
    const [body, setBody] = useState("");
    const [thanks, setThanks] = useState(false);
    const { user, updateUser, darkMode } = useContext(UserContext);
    const { id } = useParams();

    const image = images.filter(image => image.public_id === userFromQuestion.email);
  
    const removeAnswersFromLocalStorage = () => {
        localStorage.removeItem('answers');
    };

    const removeQuestionFromLocalStorage = (id) => {
        localStorage.removeItem('questions' + '/' + id);
    };

    const removeUserFromQuestionFromLocalStorage = (id) => {
        localStorage.removeItem('users' + '/' + id);
    };

    const navigate = useNavigate();

    useEffect(() => {
        if(!user) {
            navigate('/login');
        }
    }, [user]);

    //For Answers
    useEffect(() => {
        const cachedAnswers = localStorage.getItem('answers');
        if(cachedAnswers && cachedAnswers.length > nothingInLocalStorage) {
          setAnswers(JSON.parse(cachedAnswers));
        }
        else{
            const fetchAnswers = async () => {
                const response = await fetch(url + '/answers');
                const data = await response.json();
                setAnswers(data);
            };
      
            fetchAnswers();
        }
    }, []);
    
    useEffect(() => {
        localStorage.removeItem('answers');
        localStorage.setItem('answers', JSON.stringify(answers));
        const timer = setTimeout(() => removeAnswersFromLocalStorage(), MAX_TIME);
        return () => clearTimeout(timer);
    }, [answers])

    //For Question
    useEffect(() => {
        const cachedQuestion = localStorage.getItem(`questions/${id}`);
        if(cachedQuestion && cachedQuestion.length > nothingInLocalStorage) {
          setQuestion(JSON.parse(cachedQuestion));
          setFinishStatus(true);
        }
        else{
            const fetchQuestion = async () => {
                const response = await fetch(url + `/questions/${id}`);
                const data = await response.json();
                setQuestion(data);
                setFinishStatus(true);
            };
    
            fetchQuestion();
        }
    }, []);

    useEffect(() => {
        localStorage.removeItem(`questions/${id}`);
        localStorage.setItem(`questions/${id}`, JSON.stringify(question));
        const timer = setTimeout(() => removeQuestionFromLocalStorage(id), MAX_TIME);
        return () => clearTimeout(timer);
    }, [question])

    //For User
    useEffect(() => {
        const cachedUser = localStorage.getItem(`users/${question.userId}`);
        if(cachedUser && cachedUser.length > nothingInLocalStorage) {
            setUserFromQuestion(JSON.parse(cachedUser));
            setFinishStatus(false);
        }
        else if(FinishStatus === true){
            const fetchUser = async () => {
                const response = await fetch(url + `/users/${question.userId}`);
                const data = await response.json();
                setUserFromQuestion(data);
                setFinishStatus(false);
            };
    
            fetchUser();
        }
    }, [FinishStatus]);

    useEffect(() => {
        localStorage.removeItem(`users/${question.userId}`);
        localStorage.setItem(`users/${question.userId}`, JSON.stringify(userFromQuestion));
        const timer = setTimeout(() => removeUserFromQuestionFromLocalStorage(question.userId), MAX_TIME);
        return () => clearTimeout(timer);
    }, [userFromQuestion])

    const handleLogout = () => {
        updateUser(null);
        navigate('/login');
    };
    
    const answersOfCurrentQuestion = (answers.filter(answer => answer.questionId == id))

    const handleSubmit = async (e) => {
        const questionId = id;

        if(question.userId === user.id) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: "You can't answer your own questions"
            });
            return;
        }

        if(body.length <= 10) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: "Your answer can't be less than 10 characters"
            });
            return;
        }

        try {
          // Make the question API request
          const response = await fetch(url + `/answers`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ body, thanks, questionId }),
            credentials: 'include'
          });
    
          if (response.ok) {
            const data = await response.json();
            const loggedInUser = data.user;
    
            console.log(`The answer was successfully added on question ${questionId}`);
    
            // Reset form fields
            setBody('');
    
            // Refresh the page
            navigate(`/question/${id}`);
          } else {
            // Handle upload failure case
            Swal.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: "Invalid Upload. Please try again."
            });
          }
        } catch (error) {
          // Handle any network or API request errors
          Swal.fire({
            icon: 'error',
            title: 'Upload Failed: ' + error,
            text: "Invalid Upload. Please try again."
        });
        }
    };

    const checkIfThankedAnswerExist = () => {
        for(let i = 0; i<answersOfCurrentQuestion.length; i++) 
            if(answersOfCurrentQuestion[i].thanks === true) return true;
        return false;
    }

    let thankedAnswerExist = useMemo(() => checkIfThankedAnswerExist(answersOfCurrentQuestion), [answersOfCurrentQuestion]);

    const handleGiveThanks = async (answerId, answerBody, answerUser) => {
        try {
            const questionId = id;
            const body = answerBody;
            const thanks = true;

            // Make the question API request
            const response = await fetch(url + `/answers` + `/${answerId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ body, thanks, questionId }),
              credentials: 'include'
            });
      
            if (response.ok) {
                const data = await response.json();
                const loggedInUser = data.user;

                // Make the update of coins API request
                try {
                    const username = answerUser.username;
                    const title = answerUser.title;
                    const about = answerUser.about;
                    const coins = answerUser.coins + question.coins;

                    const response = await fetch(url + `/users` + `/${answerUser.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, title, about, coins }),
                    credentials: 'include'
                    });
            
                    if (!response.ok) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Thanked Failed',
                            text: "Please try again."
                        });
                    }
                    } catch (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Thanked Failed: ' + error,
                            text: "Please try again."
                        });
                    }
      
                // Refresh the page
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            } else {
              // Handle upload failure case
              Swal.fire({
                  icon: 'error',
                  title: 'Thanked Failed',
                  text: "Please try again."
              });
            }
          } catch (error) {
            // Handle any network or API request errors
            Swal.fire({
              icon: 'error',
              title: 'Thanked Failed: ' + error,
              text: "Please try again."
          });
          }
    }

    return (
        <div className="question-details">
            <Suspense fallback={<PersonalizedFallback />}>
                <LazyNavBar images={images} handleSetSearchQuery={handleSetSearchQuery} handleLogout={handleLogout}/>
            </Suspense>

            <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "3rem" }}>
                <div className="custom-container-question-details px-4 pt-2" style={{ backgroundColor: darkMode ? "#2D3748" : "rgba(248,249,250,1)" }}>
                    <div style={{ backgroundColor: darkMode ? "#2D3748" : "rgba(248,249,250,1)", border: `0.9px solid ${darkMode ? "white" : "gray"}` }} className="question-card position-relative mt-0 px-3 pb-1 pt-3 custom-margin-question-details">
                        <div className="row">
                            <div className="col-auto">
                                <div className='preview-container' style={{width: "32px", height: "32px", marginBottom: "8px"}}>
                                    {image && image[0] && image[0].url && 
                                        <img className='preview-image' src={image[0].url} alt="lol" />
                                    }
                                </div>
                            </div>
                            <div className="col-auto">
                                <h6 className="mt-1" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}> {userFromQuestion.username} </h6>
                            </div>
                            <div className="col-auto" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}> <h6 className="mt-1"> - </h6> </div>

                            <div className="col-auto">
                                <h6 className="mt-1" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)", fontStyle: "italic" }}> {userFromQuestion.title} </h6>
                            </div>

                            <div className="col-auto" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}> <h6 className="mt-1"> - </h6> </div>

                            <div className="col-auto">
                                <h6 className="mt-1 text-decoration-underline" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}> {question.subject} </h6>
                            </div>
                        </div>
                        <div>
                            <span className="fw-bold" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}>{question.title}</span>
                        </div>
                        <div className="">
                            <p style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}> {question.body} </p>
                        </div>
                            {
                                answersOfCurrentQuestion.length > 0 && 
                                <div style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}} className="position-absolute bottom-0 end-0 p-1 px-3 text-decoration-underline">
                                    {answersOfCurrentQuestion.length} answers
                                </div>
                            }
                            {
                                answersOfCurrentQuestion.length == 0 && 
                                <div style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}} className="position-absolute bottom-0 end-0 p-1 px-3 text-decoration-underline">
                                    No answers, be the first!
                                </div>
                            }
                        <div class="">
                            <div class="position-absolute top-0 end-0 p-1 px-3 text-danger fw-bold">
                                {question.coins} coins
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                answersOfCurrentQuestion?.map((answer) => (
                    <Answer images={images} answer={answer} handleGiveThanks={handleGiveThanks} user={user} question={question} thankedAnswerExist={thankedAnswerExist}/>
                  ))
            }

            <div className="d-flex justify-content-center align-items-center" style={{marginBottom: "4rem"}}>
                <div className="d-flex justify-content-center align-items-center custom-container-question-details px-4 pt-3 pb-2" style={{ backgroundColor: darkMode ? "#2D3748" : "rgba(248,249,250,1)" }}>
                    <div style={{ marginLeft: "4.75rem", marginRight: "4.75rem" }} className="flex-fill" >
                        <form onSubmit={handleSubmit}>
                            <input onChange={(e) => setBody(e.target.value)} placeholder="Ans the question.." type="text" className="form-control custom-input-question-details" />
                            <div className="d-flex justify-content-center">
                                <button className={`form-group btn ${darkMode ? 'btn-light' : 'btn-dark'} fw-bold mt-4`}>Send Answer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Suspense fallback={<PersonalizedFallback />}>
                <LazyFooter/>
            </Suspense>
        </div>
    );
}

export default QuestionDetails;