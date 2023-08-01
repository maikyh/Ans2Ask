import React from 'react';
import { useState, useEffect, useContext, Suspense } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext.js';
import { NavDropdown } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { url } from "../../utils/Constants.jsx";
import { removeStopWords } from "../../utils/StopWords.jsx";
import "./Ask.css";

const LazyNavBar = React.lazy(() => import('../Navbar/Navbar'));

const Ask = ({images, handleSetSearchQuery}) => {
    const { user, updateUser } = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [body, setbody] = useState("");
    const [subject, setSubject] = useState("Select Subject");
    const [questionCoins, setQuestionCoins] = useState(5);

    const handleSetSubject = (selectedSubject) => {
        setSubject(selectedSubject);
    };

    const handleSetCoins = (selectedCoins) => {
        setQuestionCoins(selectedCoins);
    };

    const navigate = useNavigate();

    useEffect(() => {
        if(!user) {
        navigate('/login');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(subject === "Select Subject") {
            Swal.fire({
                icon: 'warning',
                title: 'No Subject Selected',
                text: "Select a subject and try again."
            });
            return;
        }

        if(questionCoins > user.coins) {
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
          for(const word of titleWithoutStopWords){
            if(!mapOfWords[word]) mapOfWords[word] = 1;
            else mapOfWords[word]++;
          }

          const bodyWithoutStopWords = removeStopWords(body).split(' ');
          for(const word of bodyWithoutStopWords){
            if(!mapOfWords[word]) mapOfWords[word] = 1;
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
              
            // Navigate to question details
            navigate(`/question/${data.id}`);
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
    
    const handleLogout = () => {
        updateUser(null);
        navigate('/login');
    };

    return (
        <div className="ask">
            <Suspense fallback={<div>Loading...</div>}>
                <LazyNavBar images={images} handleSetSearchQuery={handleSetSearchQuery} handleLogout={handleLogout}/>
            </Suspense>

            
  
            <div className="d-flex justify-content-center align-items-center custom-margin-ask" style={{marginTop: "10rem"}}>
                <div className="custom-container-ask bg-light p-4 border rounded px-5">
                    <h1 className="text-center mb-4 fw-bold">Ask Your Question !</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-4">
                            <label className="mb-2 fw-bold" htmlFor="title">Title</label>
                            <input 
                                className="form-control bg-lighter" 
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label className="mb-2 fw-bold" htmlFor="password">Text</label>
                            <textarea 
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
                                        <NavDropdown.Item onClick={() => {handleSetSubject("Informatics")}}>Informatics</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => {handleSetSubject("Mathematics")}}>Mathematics</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => {handleSetSubject("Biology")}}>Biology</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => {handleSetSubject("Health")}}>Health</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => {handleSetSubject("Art")}}>Art</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => {handleSetSubject("Business")}}>Business</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => {handleSetSubject("Law")}}>Law</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => {handleSetSubject("Investment")}}>Investment</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => {handleSetSubject("History")}}>History</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => {handleSetSubject("Videogames")}}>Videogames</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => {handleSetSubject("Chemistry")}}>Chemistry</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => {handleSetSubject("Physics")}}>Physics</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => {handleSetSubject("Animation")}}>Animation</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => {handleSetSubject("Geography")}}>Geography</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => {handleSetSubject("SAT")}}>SAT</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => {handleSetSubject("Food")}}>Food</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => {handleSetSubject("Languages")}}>Languages</NavDropdown.Item>
                                    </div>
                                </NavDropdown>
                            </button>
                            <button className='btn btn-secondary'>
                                <NavDropdown required title={"Cost of Question: " + questionCoins}>
                                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                        <NavDropdown.Item onClick={() => {handleSetCoins(5)}}>5</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => {handleSetCoins(10)}}>10</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => {handleSetCoins(15)}}>15</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => {handleSetCoins(20)}}>20</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => {handleSetCoins(25)}}>25</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => {handleSetCoins(50)}}>50 (Urgent)</NavDropdown.Item>
                                    </div>
                                </NavDropdown>
                            </button>
                        </div>
                        <div className="text-center mt-4">
                            <button className='btn btn-dark w-100 d-block fw-bold mb-4'> Ask </button>
                        </div>
                    </form>
                </div>
            </div>

            <div>
    </div>
  
            <footer className="bg-light py-4">
                <div className="container text-center">
                    <p className="text-muted mb-0">
                        &copy; {new Date().getFullYear()} Ans2Ask. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Ask;