import React from "react";  
import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer.jsx";
import Swal from 'sweetalert2';
import "./QuestionDetails.css";

const url = `http://localhost:3001`;

export default function QuestionDetails({handleSetSearchQuery}) {
    const [question, setQuestion] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [userFromQuestion, setUserFromQuestion] = useState([]);
    const [FinishStatus, setFinishStatus] = useState(false);
    const [body, setBody] = useState("");
    const [thanks, setThanks] = useState(false);
    const { user, updateUser } = useContext(UserContext);
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if(!user) {
            navigate('/login');
        }
    }, [user]);

    useEffect(() => {
        const fetchQuestion = async () => {
            const response = await fetch(url + `/questions/${id}`);
            const data = await response.json();
            setQuestion(data);
            setFinishStatus(true);
        };

        const fetchAnswers = async () => {
            const response = await fetch(url + `/answers`);
            const data = await response.json();
            setAnswers(data);
        };

        fetchQuestion();
        fetchAnswers();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(url + `/users/${question.userId}`);
            const data = await response.json();
            setUserFromQuestion(data);
            setFinishStatus(false);
        };

        fetchUser();
    }, [FinishStatus]);

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

    return (
        <div className="question-details">
            <Navbar handleSetSearchQuery={handleSetSearchQuery} handleLogout={handleLogout}/>

            <div className="d-flex justify-content-center align-items-center">
                <div className="custom-container-question-details bg-light px-4 pt-2">
                    <div style={{border: '0.9px solid gray' }} className="question-card position-relative bg-white mt-0 px-3 pb-1 pt-3 custom-margin-question-details">
                        <div className="row">
                            <div className="col-auto">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div className="col-auto">
                                <h6 className="mt-1"> {userFromQuestion.username} </h6>
                            </div>
                            <div className="col-auto"> <h6 className="mt-1"> - </h6> </div>

                            <div className="col-auto">
                                <h6 className="mt-1"> {question.subject} </h6>
                            </div>
                        </div>
                        <div>
                            <span className="fw-bold">{question.title}</span>
                        </div>
                        <div className="">
                            <p> {question.body} </p>
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
                        <div class="">
                            <div class="position-absolute top-0 end-0 p-1 px-3 text-danger fw-bold">
                                {question.coins} coins !
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                answersOfCurrentQuestion?.map((answer) => (
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="d-flex justify-content-center align-items-center custom-container-question-details bg-light px-4 pt-3 pb-2">
                            <div style={{border: '0.5px solid gray' }} className="custom-container-question-details-answer mt-0 p-2 px-3 position-relative">
                                <div className="row">
                                    <div className="col-auto">
                                        <FontAwesomeIcon icon={faUser} />
                                    </div>
                                    <div className="col-auto">
                                        <h6 className="mt-1"> {answer.user.username} </h6>
                                    </div>
                                </div>
                                <div className="row border border-dark mb-1 mx-0"></div>
                                <div className="">
                                    <p className="mb-1"> {answer.body} </p>
                                </div>
                                <div class="position-absolute top-0 end-0 p-1 px-3 text-danger fw-bold">
                                    <button className="btn btn-danger py-0 px-1">
                                        Give Thanks
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                  ))
            }

            <div className="d-flex justify-content-center align-items-center">
                <div className="d-flex justify-content-center align-items-center custom-container-question-details bg-light px-4 pt-3 pb-2">
                    <div style={{ marginLeft: "4.75rem", marginRight: "4.75rem" }} className="flex-fill" >
                        <form onSubmit={handleSubmit}>
                            <input onChange={(e) => setBody(e.target.value)} placeholder="Ans the question.." type="text" className="form-control custom-input-question-details" />
                            <div className="d-flex justify-content-center">
                                <button className="form-group btn btn-dark fw-bold mt-4">Send Answer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
}