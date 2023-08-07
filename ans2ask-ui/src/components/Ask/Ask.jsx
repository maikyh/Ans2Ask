import React from 'react';
import { useState, useContext, Suspense } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext.js';
import { NavDropdown } from 'react-bootstrap';
import { url } from "../../utils/Constants.jsx";
import { removeStopWords } from "../../utils/StopWords.jsx";
import Swal from 'sweetalert2';
import Text from '../../utils/Text.jsx';
import Content from '../../utils/Content.jsx';
import "./Ask.css";

const LazyNavBar = React.lazy(() => import('../Navbar/Navbar'));

const Ask = ({ images, handleSetSearchQuery }) => {
    const { user, updateUser, darkMode } = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [body, setbody] = useState("");
    const [subject, setSubject] = useState("Select Subject");
    const [questionCoins, setQuestionCoins] = useState(5);

    const navigate = useNavigate();

    const handleSetSubject = (selectedSubject) => {
        setSubject(selectedSubject);
    };

    const handleSetCoins = (selectedCoins) => {
        setQuestionCoins(selectedCoins);
    };

    const handleLogout = () => {
        updateUser(null);
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (subject === "Select Subject") {
            Swal.fire({
                icon: 'warning',
                title: 'No Subject Selected',
                text: "Select a subject and try again."
            });
            return;
        }

        if (questionCoins > user.coins) {
            Swal.fire({
                icon: 'error',
                title: "You don't have enough coins",
                text: "Answer other questions to earn coins. Spread your knowledge!"
            });
            return;
        }

        try {
            // Make the question API request
            const coins = questionCoins;

            const clickCounts = 0;

            const mapOfWords = {};

            const titleWithoutStopWords = removeStopWords(title).split(' ');
            for (const word of titleWithoutStopWords) {
                if (!mapOfWords[word]) mapOfWords[word] = 1;
                else mapOfWords[word]++;
            }

            const bodyWithoutStopWords = removeStopWords(body).split(' ');
            for (const word of bodyWithoutStopWords) {
                if (!mapOfWords[word]) mapOfWords[word] = 1;
                else mapOfWords[word]++;
            }

            const response = await fetch(url + `/questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, body, subject, coins, clickCounts, mapOfWords }),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                const loggedInUser = data.user;

                // Reset form fields
                setTitle('');
                setbody('');
                setSubject("Select Subject");

                // Make the update of coins API request
                try {
                    const username = user.username;
                    const title = user.title;
                    const about = user.about;
                    const coins = user.coins - questionCoins;

                    const response = await fetch(url + `/users` + `/${user.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ username, title, about, coins }),
                        credentials: 'include'
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const UpdatedUser = data.user;

                        updateUser(UpdatedUser);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Upload Failed',
                            text: "Invalid Upload. Please try again."
                        });
                    }

                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Upload Failed: ' + error,
                        text: "Invalid Upload. Please try again."
                    });
                }

                Swal.fire({
                    icon: 'success',
                    title: 'Question Asked Successfully',
                    text: 'Your question has been submitted!',
                    timer: 850,
                    showConfirmButton: false,
                });

                // Navigate to question details
                setTimeout(() => {
                    navigate(`/question/${data.id}`);
                    setTimeout(() => {
                        window.location.reload();
                    }, 0);
                }, 850);
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
        <div className="ask">
            <Suspense fallback={<div>Loading...</div>}>
                <LazyNavBar images={images} handleSetSearchQuery={handleSetSearchQuery} handleLogout={handleLogout} />
            </Suspense>

            <div className="d-flex justify-content-center align-items-center custom-margin-ask" style={{ height: "814px" }}>
                <div className="custom-container-ask p-4 border rounded px-5" style={{ backgroundColor: darkMode ? Content.darkMode : Content.lightMode, marginTop: "4rem" }}>
                    <h1 className="text-center mb-4 fw-bold" style={{ color: darkMode ? Text.darkMode : Text.lightMode }}>Ask Your Question !</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-4">
                            <label className="mb-2 fw-bold" style={{ color: darkMode ? Text.darkMode : Text.lightMode }} htmlFor="title">Title</label>
                            <input
                                style={{ backgroundColor: darkMode ? Content.darkMode : "#fff", color: darkMode ? Text.darkMode : Text.lightMode }}
                                className="form-control bg-lighter"
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label style={{ color: darkMode ? Text.darkMode : Text.lightMode }} className="mb-2 fw-bold" htmlFor="password">Text</label>
                            <textarea
                                style={{ backgroundColor: darkMode ? Content.darkMode : "#fff", color: darkMode ? Text.darkMode : Text.lightMode }}
                                class="form-control bg-lighter"
                                id="text"
                                rows="6"
                                value={body}
                                onChange={(e) => setbody(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <button className='btn btn-secondary'>
                                <NavDropdown required title={subject}>
                                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                        <NavDropdown.Item onClick={() => { handleSetSubject("Informatics") }}>Informatics</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { handleSetSubject("Mathematics") }}>Mathematics</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { handleSetSubject("Biology") }}>Biology</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { handleSetSubject("Health") }}>Health</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { handleSetSubject("Art") }}>Art</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { handleSetSubject("Business") }}>Business</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { handleSetSubject("Law") }}>Law</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { handleSetSubject("Investment") }}>Investment</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { handleSetSubject("History") }}>History</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { handleSetSubject("Videogames") }}>Videogames</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { handleSetSubject("Chemistry") }}>Chemistry</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { handleSetSubject("Physics") }}>Physics</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { handleSetSubject("Animation") }}>Animation</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { handleSetSubject("Geography") }}>Geography</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { handleSetSubject("SAT") }}>SAT</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { handleSetSubject("Food") }}>Food</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { handleSetSubject("Languages") }}>Languages</NavDropdown.Item>
                                    </div>
                                </NavDropdown>
                            </button>
                            <button className='btn btn-secondary'>
                                <NavDropdown required title={"Cost of Question: " + questionCoins}>
                                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                        <NavDropdown.Item onClick={() => { handleSetCoins(5) }}>5</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { handleSetCoins(10) }}>10</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { handleSetCoins(15) }}>15</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { handleSetCoins(20) }}>20</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { handleSetCoins(25) }}>25</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { handleSetCoins(50) }}>50 (Urgent)</NavDropdown.Item>
                                    </div>
                                </NavDropdown>
                            </button>
                        </div>
                        <div className="text-center mt-4">
                            <button className={`btn ${darkMode ? 'btn-light' : 'btn-dark'} w-100 d-block fw-bold mb-4`}> Ask </button>
                        </div>
                    </form>
                </div>
            </div>
            <div>
            </div>

            <footer className="bg-light">
                <div className="text-center" style={{ backgroundColor: darkMode ? Content.darkMode : Content.lightMode, height: "72px" }}>
                    <p style={{ color: darkMode ? Text.darkMode : Text.lightMode, paddingTop: "25px" }}>
                        &copy; {new Date().getFullYear()} Ans2Ask. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Ask;