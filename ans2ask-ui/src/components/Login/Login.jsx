import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext.js';
import Swal from 'sweetalert2';
import { url } from "../../utils/Constants.jsx";
import { Button } from "@chakra-ui/button";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Text from '../../utils/Text.jsx';
import Content from '../../utils/Content.jsx';
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

          Swal.fire({
            icon: 'success',
            title: 'Successfully Logged In',
            text: 'You have been logged in!',
            timer: 850, 
            showConfirmButton: false, 
          });
  
          navigate('/home');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid username or password. Please try again.',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid username or password. Please try again.',
        });
      }
  };

  return (
    <div className="login">
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: darkMode ? Content.darkMode : Content.lightMode }}>
          <div className="container">
              <div className="d-flex justify-content-between align-items-center w-100">
              <a className="navbar-brand" style={{color: darkMode ? Text.darkMode : Text.lightMode}} href="#">Ans2Ask</a>
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

      <div className="d-flex justify-content-center align-items-center custom-margin-login" style={{height: "764px"}}>
          <div className="custom-container p-4 border rounded px-5" style={{ backgroundColor: darkMode ? Content.darkMode : Content.lightMode }}>
              <h1 className="text-center mb-4 fw-bold" style={{color: darkMode ? Text.darkMode : Text.lightMode}}>Ans2Ask</h1>
              <form onSubmit={handleLogin}>
                  <div className="form-group mb-4">
                      <label className="mb-2 fw-bold" htmlFor="usernameOrEmail" style={{color: darkMode ? Text.darkMode : Text.lightMode}}>Username</label>
                      <input 
                          style={{ backgroundColor: darkMode ? Content.darkMode : "#fff", color: darkMode ? Text.darkMode : Text.lightMode }}
                          className="form-control" 
                          type="text"
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                      />
                  </div>
                  <div className="form-group mb-5">
                      <label className="mb-2 fw-bold" htmlFor="password" style={{color: darkMode ? Text.darkMode : Text.lightMode}}>Password</label>
                      <input 
                          style={{ backgroundColor: darkMode ? Content.darkMode : "#fff", color: darkMode ? Text.darkMode : Text.lightMode }}
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
                          <a className="custom-link" href="#" style={{color: darkMode ? Text.darkMode : Text.lightMode}}>Forgot password?</a>
                      </div>
                      <div className="mb-2">
                          <a className="custom-link" href="/register"style={{color: darkMode ? Text.darkMode : Text.lightMode}}>Don't have an account?</a>
                      </div>
                  </div>
              </form>
          </div>
      </div>

      <footer className="bg-light">
          <div className="text-center" style={{ backgroundColor: darkMode ? Content.darkMode : Content.lightMode, height:"72px"}}>
              <p style={{color: darkMode ? Text.darkMode : Text.lightMode, paddingTop: "25px"}}>
              &copy; {new Date().getFullYear()} Ans2Ask. All rights reserved.
              </p>
          </div>
      </footer>
    </div>
  );
}
export default Login;