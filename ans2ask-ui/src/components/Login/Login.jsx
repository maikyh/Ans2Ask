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