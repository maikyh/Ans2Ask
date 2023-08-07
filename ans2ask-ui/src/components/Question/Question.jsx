import React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../UserContext.js';
import { useNavigate } from "react-router-dom";
import { url, nothingInLocalStorage, MAX_TIME, MAX_LENGTH } from "../../utils/Constants.jsx";
import { Badge } from '@chakra-ui/react'
import { Tooltip } from '@chakra-ui/react'
import Highlighter from "react-highlight-words";
import Text from '../../utils/Text.jsx';
import Content from '../../utils/Content.jsx';
import "./Question.css";

const Question = ({ sentence, userId, images, id, username, email, userTitle, subject, title, body, coins }) => {
    const [answers, setAnswers] = useState([]);
    const [image, setImage] = useState([]);
    const { darkMode } = useContext(UserContext);

    const navigate = useNavigate();

    const handleNavigateToQuestionDetails = () => {
        navigate(`/question/${id}`);
        setTimeout(() => {
            window.location.reload();
        }, 0);
    }

    const handleNavigateToUserProfile = () => {
        navigate(`/user/${userId}`);
    }

    const removeImageQueryFromLocalStorage = (query) => {
        localStorage.removeItem('images' + '/' + query);
    }

    const removeAnswersFromLocalStorage = () => {
        localStorage.removeItem('answers');
    }

    function truncateText(body) {
        if (body.length > MAX_LENGTH) return body.substring(0, MAX_LENGTH) + "...";
        return body;
    }

    //For Images/user
    //The Cloudinary API is limited to fetching 10 images per request. That's why I needed to individually recall images if the user's picture didn't appear in the initial fetch in app.jsx.
    useEffect(() => {
        const currImage = images?.filter(image => image.public_id === email);
        if (currImage && currImage[0]) {
            setImage(currImage[0])
            return;
        }

        const cachedImage = localStorage.getItem('images' + '/' + email);
        if (cachedImage && cachedImage.length > nothingInLocalStorage) {
            setImage(JSON.parse(cachedImage));
        }
        else {
            const fetchImage = async () => {
                const response = await fetch(url + '/images' + '/' + email);
                const data = await response.json();
                setImage(data);
            };

            fetchImage();
        }
    }, []);

    useEffect(() => {
        localStorage.removeItem('images' + '/' + email);
        localStorage.setItem('images' + '/' + email, JSON.stringify(image));
        const timer = setTimeout(() => removeImageQueryFromLocalStorage(email), MAX_TIME);
        return () => clearTimeout(timer);
    }, [image])

    //For Answers
    useEffect(() => {
        const cachedAnswers = localStorage.getItem('answers');
        if (cachedAnswers && cachedAnswers.length > nothingInLocalStorage) {
            setAnswers(JSON.parse(cachedAnswers));
        }
        else {
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

    const answersOfCurrentQuestion = (answers.filter(answer => answer.questionId == id))

    return (
        <div style={{ position: 'relative' }} className="question">
            <div style={{ backgroundColor: darkMode ? Content.darkMode : Content.lightMode, border: `0.9px solid ${darkMode ? "white" : "gray"}` }} className="question-card mt-4 p-3">
                <Tooltip label='View Profile' placement='left-start' bg='#bee3f0' color="black">
                    <div className="row" style={{ cursor: 'pointer' }} onClick={() => handleNavigateToUserProfile()} >
                        <div className="col-auto">
                            <div className='preview-container' style={{ width: "32px", height: "32px", marginBottom: "8px" }}>
                                {image && image.url &&
                                    <img className='preview-image' src={image.url} alt="profilePicture" />
                                }
                            </div>
                        </div>

                        <div className="col-auto" style={{ color: darkMode ? Text.darkMode : Text.lightMode }}>
                            <h6 className="mt-1" style={{ color: darkMode ? Text.darkMode : Text.lightMode }}> {username} </h6>
                        </div>

                        <div className="col-auto" style={{ color: darkMode ? Text.darkMode : Text.lightMode }}> <h6 className="mt-1"> - </h6> </div>

                        <div className="col-auto">
                            <h6 className="mt-1" style={{ color: darkMode ? Text.darkMode : Text.lightMode, fontStyle: "italic" }}> {userTitle} </h6>
                        </div>
                        <div>

                        </div>
                    </div>
                </Tooltip>
                <Tooltip label='View More Details' placement='left-end' bg='#bee3f0' color="black">
                    <div style={{ cursor: 'pointer' }} onClick={() => handleNavigateToQuestionDetails(id)}>
                        <div>
                            <span className="fw-bold" style={{ color: darkMode ? Text.darkMode : Text.lightMode }}>{title}</span>
                        </div>
                        <div className="">
                            <div style={{ marginBottom: "10px" }}>
                                <Highlighter
                                    style={{ color: darkMode ? Text.darkMode : Text.lightMode }}
                                    highlightClassName="YourHighlightClass"
                                    searchWords={sentence ? sentence.split(' ') : []}
                                    autoEscape={true}
                                    textToHighlight={truncateText(body)}
                                />
                            </div>
                            {
                                answersOfCurrentQuestion.length > 0 &&
                                <div className="position-absolute bottom-0 end-0 p-1 px-3 underline-text" style={{ color: darkMode ? Text.darkMode : Text.lightMode }}>
                                    {answersOfCurrentQuestion.length} answers
                                </div>
                            }
                            {
                                answersOfCurrentQuestion.length == 0 &&
                                <div className="position-absolute bottom-0 end-0 p-1 px-3 underline-text" style={{ color: darkMode ? Text.darkMode : Text.lightMode }}>
                                    No answers, be the first!
                                </div>
                            }
                        </div>
                        <div class="">
                            <div class="position-absolute end-0 p-1 px-3 text-danger fw-bold" style={{ top: "10px" }}>
                                <div className="col-auto">
                                    <Badge>{subject}</Badge>
                                    <Badge style={{ marginLeft: "10px" }} variant='solid' colorScheme='red'>
                                        {coins} coins
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </Tooltip>
            </div>
        </div>
    );
}

export default Question;