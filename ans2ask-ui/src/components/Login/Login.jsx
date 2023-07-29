import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext.js';
import Swal from 'sweetalert2';
import { url } from "../../utils/Constants.jsx";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { updateUser, darkMode, updateDarkMode } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch(url + `/users/login`, {
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
  
          updateUser(loggedInUser);
  
          navigate('/home');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid username or password. Please try again.',
          });
        }
      } catch (error) {
        console.log('Login failed: ' + error);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid username or password. Please try again.',
        });
      }
  };

  const handleUpdateDarkMode = () => {
    updateDarkMode(!darkMode);
  }

  return (
    <div className="login">
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: darkMode ? "#2D3748" : "rgba(248,249,250,1)" }}>
          <div className="container">
              <div className="d-flex justify-content-between align-items-center w-100">
              <a className="navbar-brand" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}} href="#">Ans2Ask</a>
              <button className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`} onClick={() => handleUpdateDarkMode()}>
                darkMode
              </button>
              <Link to={`/register`} className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}>
                Register
              </Link>
              </div>
          </div>
      </nav>

      <div className="d-flex justify-content-center align-items-center custom-margin-login" style={{backgroundColor: darkMode ? "#1A202C" : "", height: "762px"}}>
          <div className="custom-container p-4 border rounded px-5" style={{ backgroundColor: darkMode ? "#2D3748" : "rgba(248,249,250,1)" }}>
              <h1 className="text-center mb-4 fw-bold" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}>Ans2Ask</h1>
              <form onSubmit={handleLogin}>
                  <div className="form-group mb-4">
                      <label className="mb-2 fw-bold" htmlFor="usernameOrEmail" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}>Username or Email</label>
                      <input 
                          style={{ backgroundColor: darkMode ? "#2D3748" : "#fff", color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)" }}
                          className="form-control" 
                          type="text"
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                      />
                  </div>
                  <div className="form-group mb-5">
                      <label className="mb-2 fw-bold" htmlFor="password" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}>Password</label>
                      <input 
                          style={{ backgroundColor: darkMode ? "#2D3748" : "#fff", color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)" }}
                          className="form-control"  
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                      />
                  </div>
                  <div className="text-center">
                  <button className={`btn ${darkMode ? 'btn-light' : 'btn-dark'} w-100 d-block fw-bold mb-4`}> Login </button>
                      <div className="mb-2">
                          <a className="custom-link" href="#" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}>Forgot password?</a>
                      </div>
                      <div className="mb-2">
                          <a className="custom-link" href="/register"style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}>Don't have an account?</a>
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
export default Login;