import React from 'react';
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext.js';
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