import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Make the signup API request
          const response = await fetch(`http://localhost:3001/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
            credentials: 'include'
          });
    
          if (response.ok) {
            const data = await response.json();
            const loggedInUser = data.user;
    
            console.log('The user was successfully registered');
    
            // Reset form fields
            setUsername('');
            setEmail('');
            setPassword('');
    
            // Navigate to the login after successful login
            navigate('/login');
          } else {
            // Handle signup failure case
            alert('Registration failed');
          }
        } catch (error) {
          // Handle any network or API request errors
          alert('Registration failed: ' + error);
        }
      };
    
    return (
      <div className="register">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center w-100">
                    <a className="navbar-brand" href="#">Ans2Ask</a>
                    <Link to={`/login`} className="btn btn-outline-dark">
                        Login
                    </Link>
                </div>
            </div>
        </nav>

        <div className="d-flex justify-content-center align-items-center custom-margin-register">
            <div className="custom-container bg-light p-4 border rounded px-5">
                <h1 className="text-center mb-4 fw-bold">Welcome to Ans2Ask</h1>
                <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                    <label className="mb-2 fw-bold" htmlFor="username">Username</label>
                    <input
                        className="form-control bg-lighter" 
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-4">
                    <label className="mb-2 fw-bold" htmlFor="email">Email</label>
                    <input 
                        className="form-control bg-lighter" 
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-5">
                    <label className="mb-2 fw-bold" htmlFor="password">Password</label>
                    <input 
                        className="form-control bg-lighter"  
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="text-center">
                    <button className="btn btn-dark w-100 d-block fw-bold">Register</button>
                    <div className="mt-3">
                        <a className="custom-link" href="/login" >Already have an account?</a>
                    </div>
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