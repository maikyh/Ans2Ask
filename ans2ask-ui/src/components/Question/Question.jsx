import React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../UserContext.js';
import { useNavigate } from "react-router-dom";
import { url, nothingInLocalStorage, MAX_TIME } from "../../utils/Constants.jsx";
import Highlighter from "react-highlight-words";
import { Badge } from '@chakra-ui/react'
import Text from '../../utils/Text.jsx';
import Content from '../../utils/Content.jsx';
import "./Question.css";

const MAX_LENGTH = 450;

const Question = ({ sentence, images, id, username, email, userTitle, subject, title, body, coins }) => {
    const [answers, setAnswers] = useState([]);
    const [image, setImage] = useState([]);
    const { darkMode } = useContext(UserContext);

    const removeImageQueryFromLocalStorage = (query) => {
        localStorage.removeItem('images' + '/' + query);
    };

    //Images/user
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

    useEffect(() => {
        const fetchAnswers = async () => {
            const response = await fetch(url + '/answers');
            const data = await response.json();
            setAnswers(data);
        };

        fetchAnswers();
    }, []);

    const answersOfCurrentQuestion = (answers.filter(answer => answer.questionId == id))

    const navigate = useNavigate();

    const handleNavigateToQuestionDetails = () => {
        navigate(`/question/${id}`);
        setTimeout(() => {
            window.location.reload();
        }, 0);
    }

    function truncateText(body) {
        if (body.length > MAX_LENGTH) return body.substring(0, MAX_LENGTH) + "...";
        return body;
    }

    return (
        <div style={{ cursor: 'pointer', position: 'relative' }} className="question" onClick={() => handleNavigateToQuestionDetails(id)}>
            <div style={{ backgroundColor: darkMode ? Content.darkMode : Content.lightMode, border: `0.9px solid ${darkMode ? "white" : "gray"}` }} className="question-card mt-4 p-3">
                <div className="row">
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
        </div>
    );
}

export default Question;