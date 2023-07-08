import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext.js';
import "./Login.css";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { updateUser } = useContext(UserContext);

    console.log(username + '' + password);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          // Make the login API request
          const response = await fetch(`http://localhost:3001/users/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
          });
    
          if (response.ok) {
            const data = await response.json();
            const loggedInUser = data.user;
    
            // Update the user context
            updateUser(loggedInUser);
    
            // Navigate to the home page after successful login
            navigate('/home');
          } else {
            // Handle the login failure case
            alert('Login failed');
          }
        } catch (error) {
          // Handle any network or API request errors
          alert('Login failed: ' + error);
        }
    };

    return (
      <div className="login">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center w-100">
                <a className="navbar-brand" href="#">Ans2Ask</a>
                <Link to={`/register`} className="btn btn-outline-dark">
                    Register
                </Link>
                </div>
            </div>
        </nav>

        <div className="d-flex justify-content-center align-items-center custom-margin-login">
            <div className="custom-container bg-light p-4 border rounded px-5">
                <h1 className="text-center mb-4 fw-bold">Ans2Ask</h1>
                <form onSubmit={handleLogin}>
                <div className="form-group mb-4">
                    <label className="mb-2 fw-bold" htmlFor="usernameOrEmail">Username or Email</label>
                    <input 
                        className="form-control bg-lighter" 
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                    <button className='btn btn-dark w-100 d-block fw-bold mb-4' > Login </button>
                    <div className="mb-2">
                        <a className="custom-link" href="#" >Forgot password?</a>
                    </div>
                    <div className="mb-2">
                        <a className="custom-link" href="/register" >Don't have an account?</a>
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