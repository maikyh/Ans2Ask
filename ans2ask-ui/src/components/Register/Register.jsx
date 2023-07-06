import React from "react";
import "./Register.css";

export default function Register() {
    return (
      <div className="register">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center w-100">
                    <a className="navbar-brand" href="#">Ans2Ask</a>
                    <button type="button" class="btn btn-outline-dark">Login</button>
                </div>
            </div>
        </nav>

        <div className="d-flex justify-content-center align-items-center custom-margin">
            <div className="custom-container bg-light p-4 border rounded px-5">
                <h1 className="text-center mb-4 fw-bold">Welcome to Ans2Ask</h1>
                <form>
                <div className="form-group mb-4">
                    <label className="mb-2 fw-bold" htmlFor="username">Username</label>
                    <input type="text" className="form-control bg-lighter" id="username" placeholder="" />
                </div>
                <div className="form-group mb-4">
                    <label className="mb-2 fw-bold" htmlFor="email">Email</label>
                    <input type="email" className="form-control bg-lighter" id="email" placeholder="" />
                </div>
                <div className="form-group mb-5">
                    <label className="mb-2 fw-bold" htmlFor="password">Password</label>
                    <input type="password" className="form-control bg-lighter" id="password" placeholder="" />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-dark w-100 d-block fw-bold">Register</button>
                    <div className="mt-3">
                        <a className="custom-link" href="#" >Already have an account?</a>
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