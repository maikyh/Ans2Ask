import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../UserContext.js';
import Swal from 'sweetalert2';
import { url } from "../../utils/Constants.jsx";
import { Button } from "@chakra-ui/button";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import "./Register.css";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState("New User");
    const [about, setAbout] = useState("");
    const [coins, setCoins] = useState(20);
    const { darkMode, updateDarkMode } = useContext(UserContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(url + `/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, title, about, coins }),
            credentials: 'include'
          });
    
          if (response.ok) {
            const data = await response.json();
            const loggedInUser = data.user;
    
            console.log('The user was successfully registered');
    
            setUsername('');
            setEmail('');
            setPassword('');

            Swal.fire({
              icon: 'success',
              title: 'Successfully Registered',
              text: 'You have been registered!',
              timer: 850,
              showConfirmButton: false,
            });        
    
            navigate('/login');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Registration Failed',
              text: 'An error occurred while processing your registration. Please try again later.',
            });
          }
        } catch (error) {
          console.log("Error: " + error);
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'An error occurred while processing your registration. Please try again later.',
          });
        }
      };

      const handleUpdateDarkMode = () => {
        updateDarkMode(!darkMode);
      }
    
    return (
      <div className="register">
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: darkMode ? "#2D3748" : "rgba(248,249,250,1)" }}>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center w-100">
                    <a className="navbar-brand" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}} href="#">Ans2Ask</a>
                    <Button
                        onClick={() => updateDarkMode(!darkMode)}
                        marginLeft={"27px"}
                    >
                    {!darkMode ? (
                        <SunIcon color="black.200" />
                    ) : (
                        <MoonIcon color="blue.700" />
                    )}
                    </Button>
                </div>
            </div>
        </nav>

        <div className="d-flex justify-content-center align-items-center custom-margin-register" style={{backgroundColor: darkMode ? "#1A202C" : "", height: "764px"}}>
            <div className="custom-container p-4 border rounded px-5" style={{ backgroundColor: darkMode ? "#2D3748" : "rgba(248,249,250,1)" }}>
                <h1 className="text-center mb-4 fw-bold" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}>Welcome to Ans2Ask</h1>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-4">
                      <label className="mb-2 fw-bold" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}} htmlFor="username">Username</label>
                      <input
                          style={{ backgroundColor: darkMode ? "#2D3748" : "#fff", color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)" }}
                          className="form-control bg-lighter" 
                          type="text"
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                      />
                  </div>
                  <div className="form-group mb-4">
                      <label className="mb-2 fw-bold" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}} htmlFor="email">Email</label>
                      <input 
                          style={{ backgroundColor: darkMode ? "#2D3748" : "#fff", color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)" }}
                          className="form-control bg-lighter" 
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                      />
                  </div>
                  <div className="form-group mb-5">
                      <label className="mb-2 fw-bold" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}} htmlFor="password">Password</label>
                      <input 
                          style={{ backgroundColor: darkMode ? "#2D3748" : "#fff", color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)" }}
                          className="form-control bg-lighter"  
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                      />
                  </div>
                  <div className="text-center">
                      <button className={`btn ${darkMode ? 'btn-light' : 'btn-dark'} w-100 d-block fw-bold`}>Register</button>
                      <div className="mt-3">
                          <a className="custom-link" href="/login" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}>Already have an account?</a>
                      </div>
                  </div>
                </form>
            </div>
        </div>

        <footer className="bg-light">
            <div className="text-center" style={{ backgroundColor: darkMode ? "#2D3748" : "rgba(248,249,250,1)", height:"72px"}}>
                <p style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)", paddingTop: "25px"}}>
                &copy; {new Date().getFullYear()} Ans2Ask. All rights reserved.
                </p>
            </div>
        </footer>
      </div>
    );
  }

export default Register;