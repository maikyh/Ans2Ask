import React from 'react';
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../UserContext.js";
import { Badge } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { url, MAX_TIME, nothingInLocalStorage } from "../../utils/Constants.jsx";
import { Tooltip } from '@chakra-ui/react'
import Text from '../../utils/Text.jsx';
import Content from '../../utils/Content.jsx';
import "./Answer.css";

export default function Answer({ images, answer, handleGiveThanks, user, question, thankedAnswerExist }) {
    const { darkMode } = useContext(UserContext);
    const [image, setImage] = useState([]);

    const navigate = useNavigate();

    const removeImageQueryFromLocalStorage = (query) => {
        localStorage.removeItem('images' + '/' + query);
    };

    const handleNavigateToUserProfile = () => {
        navigate(`/user/${answer.user.id}`);
    }

    //Images/user
    //The Cloudinary API is limited to fetching 10 images per request. That's why I needed to individually recall images if the user's picture didn't appear in the initial fetch in app.jsx.
    useEffect(() => {
        const currImage = images?.filter(image => image.public_id === answer.user.email);
        if (currImage && currImage[0]) {
            setImage(currImage[0])
            return;
        }

        if (answer.user && answer.user.email) {
            const cachedImage = localStorage.getItem('images' + '/' + answer.user.email);
            if (cachedImage && cachedImage.length > nothingInLocalStorage) {
                setImage(JSON.parse(cachedImage));
            }
            else {
                const fetchImage = async () => {
                    const response = await fetch(url + '/images' + '/' + answer.user.email);
                    const data = await response.json();
                    setImage(data);
                };

                fetchImage();
            }
        }
    }, [answer.user.email]);

    useEffect(() => {
        localStorage.removeItem('images' + '/' + answer.user.email);
        localStorage.setItem('images' + '/' + answer.user.email, JSON.stringify(image));
        const timer = setTimeout(() => removeImageQueryFromLocalStorage(answer.user.email), MAX_TIME);
        return () => clearTimeout(timer);
    }, [image])

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-center align-items-center custom-container-question-details px-4 pt-3 pb-2" style={{ backgroundColor: darkMode ? Content.darkMode : Content.lightMode }}>
                <div style={{ border: `0.5px solid ${darkMode ? "white" : "gray"}`, backgroundColor: darkMode ? "RGB(25, 32, 45)" : "RGB(230, 245, 255)" }} className="custom-container-answer mt-0 p-2 px-3 position-relative">
                    <Tooltip label='View Profile' placement='left-start' bg='#bee3f0' color="black">
                        <div className="row mr-0" style={{ cursor: 'pointer' }} onClick={() => handleNavigateToUserProfile()}>
                            <div className='col-auto'>
                                {image && image.url &&
                                    <img
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            marginRight: "0px",
                                            borderRadius: "50%",
                                            marginBottom: "3px"
                                        }}
                                        className='preview-image'
                                        src={image.url}
                                        alt="profilePicture"
                                    />
                                }
                            </div>
                            <div className="col" style={{ padding: "0px" }}>
                                <h6 className="mt-1" style={{ color: darkMode ? Text.darkMode : Text.lightMode }}> {answer.user.username} </h6>
                            </div>
                        </div>
                    </Tooltip>
                    <div className={`row border ${darkMode ? "border-grey" : "border-dark"} mb-1 mx-0`}></div>
                    <div className="">
                        <p className="mb-1" style={{ color: darkMode ? Text.darkMode : Text.lightMode }}> {answer.body} </p>
                    </div>
                    {
                        thankedAnswerExist === false && question.userId === user.id &&
                        <div class="position-absolute end-0 p-1 px-3 text-danger fw-bold" style={{ top: "3px" }}>
                            <button onClick={() => handleGiveThanks(answer.id, answer.body, answer.user)} className="btn btn-danger py-0 px-1">
                                Give Thanks
                            </button>
                        </div>
                    }
                    {
                        answer.thanks === true &&
                        <div class="position-absolute end-0 p-1 px-3 text-danger fw-bold" style={{ top: "3px" }}>
                            <Badge colorScheme='red'>Thanked By Author</Badge>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}