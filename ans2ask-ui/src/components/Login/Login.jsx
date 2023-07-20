import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext.js';
import Swal from 'sweetalert2';
import "./Login.css";

const url = `http://localhost:3001`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { updateUser } = useContext(UserContext);

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
export default Login;