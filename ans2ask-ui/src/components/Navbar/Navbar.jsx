import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../UserContext.js";
import { useNavigate } from "react-router-dom";
import { NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { url, MAX_TIME, nothingInLocalStorage } from "../../utils/Constants.jsx";
import { removeStopWords } from "../../utils/StopWords.jsx";
import 'bootstrap/dist/css/bootstrap.css';
import "./Navbar.css";

const Navbar = ({ images, handleSetSearchQuery, handleLogout }) => {
    const { user, updateUser } = useContext(UserContext);
    const [questions, setQuestions] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
      
    const image = images?.filter(image => image.public_id === user.email);

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

    const questionsPool = questions.map(question => question.body);

    const navigate = useNavigate();

    const handleOutsideClick = (event) => {
        if (event.button === 0) {
            setIsSuggestionsOpen(false);
        }
    };

    const handleInput = (event) => {
        const value = event.target.value;
        setInputValue(value);
        const filteredSuggestions = questionsPool.filter(option =>
            option.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
        setIsSuggestionsOpen(true);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSetSearchQuery(inputValue);
            navigate('/search');
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {document.removeEventListener('click', handleOutsideClick);};
    }, []);

    const sentence = removeStopWords(inputValue);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center w-100">
                    <a className="navbar-brand" href="/home">Ans2Ask</a>
                    <div style={{ marginLeft: "4.75rem", marginRight: "4.75rem" }} className="flex-fill" >
                        <div className="autocomplete">
                            <input
                                onKeyDown={handleKeyPress}
                                onInput={handleInput}
                                value={inputValue}
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                            />
                            {isSuggestionsOpen && suggestions.length > 0 && (
                                <div className="suggestions">
                                    {suggestions.map((suggestion, index) => (
                                        <div
                                            key={index}
                                            className="suggestion"
                                            onClick={() => {
                                                setInputValue(suggestion);
                                                handleSetSearchQuery(suggestion);
                                                setIsSuggestionsOpen(false);
                                                navigate('/search');
                                            }}
                                        >
                                            {suggestion}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <Link to={`/ask`} className="btn btn-outline-dark"> Ask </Link>
                        <div style={{ marginLeft: "1.75rem" }}>
                            <FontAwesomeIcon icon={faBell} />
                        </div>
                        <NavDropdown
                            style={{ marginLeft: "1.55rem" }}
                            alignRight
                            title={
                                <div>
                                    <div className='preview-container' style={{position: 'absolute', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: "30px", height: "30px" }}>
                                        {image && image[0] && image[0].url &&
                                            <img  className='preview-image' src={image[0].url} alt="profilePicture" />
                                        }
                                    </div>
                                </div>
                            }
                            id="basic-nav-dropdown"
                        >

                            <NavDropdown.Item>
                                {user ? (
                                    <Link style={{ textDecoration: 'none' }} to={`/user/${user.id}`}> View Profile </Link>
                                ) : (
                                    <Link style={{ textDecoration: 'none' }}> View Profile </Link>
                                )}
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout} style={{ color: "red" }}>
                                <span style={{ color: "red" }}>Log Out &nbsp; </span>
                                <FontAwesomeIcon icon={faSignOutAlt} style={{ color: "red" }} />
                            </NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;