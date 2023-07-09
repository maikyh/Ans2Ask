import React from 'react';
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext.js';
import { NavDropdown } from 'react-bootstrap';
import Navbar from "../Navbar/Navbar";
import "./Ask.css";

export default function Ask({handleSetSearchQuery}) {
    const { user, updateUser } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if(!user) {
        navigate('/login');
        }
    }, [user]);
    
    const handleLogout = () => {
        updateUser(null);
    };

    return (
        <div className="ask">
            <Navbar handleSetSearchQuery={handleSetSearchQuery} handleLogout={handleLogout}/>
  
            <div className="d-flex justify-content-center align-items-center custom-margin-ask">
                <div className="custom-container-ask bg-light p-4 border rounded px-5">
                    <h1 className="text-center mb-4 fw-bold">Ask Your Question !</h1>
                    <form >
                        <div className="form-group mb-4">
                            <label className="mb-2 fw-bold" htmlFor="title">Title</label>
                            <input 
                                className="form-control bg-lighter" 
                                type="text"
                                id="username"
                                //value={username}
                                //onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label className="mb-2 fw-bold" htmlFor="password">Text</label>
                            <textarea 
                                class="form-control bg-lighter" 
                                id="text" 
                                rows="6"
                                required
                            ></textarea>
                        </div>
                        <button className='btn btn-secondary'>
                        <NavDropdown title="Select Subject">
                            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            <NavDropdown.Item>All</NavDropdown.Item>
                            <NavDropdown.Item>Informatics</NavDropdown.Item>
                            <NavDropdown.Item>Mathematics</NavDropdown.Item>
                            <NavDropdown.Item>Biology</NavDropdown.Item>
                            <NavDropdown.Item>Health</NavDropdown.Item>
                            <NavDropdown.Item>Art</NavDropdown.Item>
                            <NavDropdown.Item>Business</NavDropdown.Item>
                            <NavDropdown.Item>Law</NavDropdown.Item>
                            <NavDropdown.Item>Investment</NavDropdown.Item>
                            <NavDropdown.Item>History</NavDropdown.Item>
                            <NavDropdown.Item>Videogames</NavDropdown.Item>
                            <NavDropdown.Item>Chemistry</NavDropdown.Item>
                            <NavDropdown.Item>Physics</NavDropdown.Item>
                            <NavDropdown.Item>Animation</NavDropdown.Item>
                            <NavDropdown.Item>Geography</NavDropdown.Item>
                            <NavDropdown.Item>SAT</NavDropdown.Item>
                            <NavDropdown.Item>Food</NavDropdown.Item>
                            <NavDropdown.Item>Languages</NavDropdown.Item>
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