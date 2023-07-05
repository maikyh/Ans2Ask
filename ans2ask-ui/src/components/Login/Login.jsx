import React from "react";
import "./Login.css";

export default function Login() {
    return (
      <div className="login">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center w-100">
                <a className="navbar-brand" href="#">Ans2Ask</a>
                <button type="button" class="btn btn-outline-dark">Login</button>
                </div>
            </div>
        </nav>
      </div>
    );
  }