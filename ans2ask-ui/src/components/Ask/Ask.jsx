import React from 'react';
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext.js';
import { NavDropdown } from 'react-bootstrap';
import Navbar from "../Navbar/Navbar";
import "./Ask.css";

export default function Ask({handleSetSearchQuery}) {
    const { user, updateUser } = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [subject, setSubject] = useState("Select Subject");

    const handleSetSubject = (selectedSubject) => {
        setSubject(selectedSubject);
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
            alert("Select a Subject");
            return;
        }
    
        try {
          // Make the question API request
          const response = await fetch(`http://localhost:3001/questions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, text, subject }),
            credentials: 'include'
          });
    
          if (response.ok) {
            const data = await response.json();
            const loggedInUser = data.user;
    
            console.log('The question was successfully posted');
    
            // Reset form fields
            setTitle('');
            setText('');
            setSubject("Select Subject");
    
            // Navigate to home
            navigate('/home');
          } else {
            // Handle upload failure case
            alert('Upload failed');
          }
        } catch (error) {
          // Handle any network or API request errors
          alert('Upload failed: ' + error);
        }
    };
    
    const handleLogout = () => {
        updateUser(null);
    };

    return (
        <div className="ask">
            <Navbar handleSetSearchQuery={handleSetSearchQuery} handleLogout={handleLogout}/>
  
            <div className="d-flex justify-content-center align-items-center custom-margin-ask">
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
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                required
                            ></textarea>
                        </div>
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
                        <div className="text-center mt-4">
                            <button className='btn btn-dark w-100 d-block fw-bold mb-4'> Ask </button>
                        </div>
                    </form>
                </div>
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