import React from "react";  
import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer.jsx";
import "./QuestionDetails.css";

const url = `http://localhost:3001`;

export default function QuestionDetails({handleSetSearchQuery}) {
    const [question, setQuestion] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [userFromQuestion, setUserFromQuestion] = useState([]);
    const [FinishStatus, setFinishStatus] = useState(false);
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
    };
    
    const answersOfCurrentQuestion = (answers.filter(answer => answer.questionId == id))
    console.log(answersOfCurrentQuestion);

    return (
        <div className="question-details">
            <Navbar handleSetSearchQuery={handleSetSearchQuery} handleLogout={handleLogout}/>

            <div className="d-flex justify-content-center align-items-center">
                <div className="custom-container-question-details bg-light px-4 pt-4 pb-2">
                    <div className="question-card bg-white mt-4 p-3">
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
                    </div>
                </div>
            </div>

            {
                answersOfCurrentQuestion?.map((answer) => (
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="custom-container-question-details bg-light px-4 pt-4 pb-2">
                            <div className="bg-white mt-4 p-3">
                                <div className="row">
                                    <div className="col-auto">
                                        <FontAwesomeIcon icon={faUser} />
                                    </div>
                                    <div className="col-auto">
                                        <h6 className="mt-1"> {answer.user.username} </h6>
                                    </div>
                                </div>
                                <div className="">
                                    <p> {answer.body} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                  ))
            }
            <Footer/>
        </div>
    );
}