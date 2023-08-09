import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../UserContext.js';
import { url } from "../../utils/Constants.jsx";
import { Button } from "@chakra-ui/button";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Swal from 'sweetalert2';
import Text from '../../utils/Text.jsx';
import Content from '../../utils/Content.jsx';
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

                const img = `https://ui-avatars.com/api/?name=${username}&background=random`;
                const responseImg = await fetch(url + `/upload` + `/${email}`, {
                    method: 'POST',
                    body: JSON.stringify({ data: img }),
                    headers: { 'Content-type': 'application/json' },
                });

                setUsername('');
                setEmail('');
                setPassword('');

                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Registered',
                    text: 'You have been registered!',
                    timer: 1050,
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
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: 'An error occurred while processing your registration. Please try again later.',
            });
        }
    };

    return (
        <div className="register">
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: darkMode ? Content.darkMode : Content.lightMode }}>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <a className="navbar-brand" style={{ color: darkMode ? Text.darkMode : Text.lightMode }} href="/login">Ans2Ask</a>
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

            <div className="d-flex justify-content-center align-items-center custom-margin-register" style={{ backgroundColor: darkMode ? "#1A202C" : "", height: "764px" }}>
                <div className="custom-container p-4 border rounded px-5" style={{ backgroundColor: darkMode ? Content.darkMode : Content.lightMode }}>
                    <h1 className="text-center mb-4 fw-bold" style={{ color: darkMode ? Text.darkMode : Text.lightMode }}>Welcome to Ans2Ask</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-4">
                            <label className="mb-2 fw-bold" style={{ color: darkMode ? Text.darkMode : Text.lightMode }} htmlFor="username">Username</label>
                            <input
                                style={{ backgroundColor: darkMode ? Content.darkMode : "#fff", color: darkMode ? Text.darkMode : Text.lightMode }}
                                className="form-control bg-lighter"
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label className="mb-2 fw-bold" style={{ color: darkMode ? Text.darkMode : Text.lightMode }} htmlFor="email">Email</label>
                            <input
                                style={{ backgroundColor: darkMode ? Content.darkMode : "#fff", color: darkMode ? Text.darkMode : Text.lightMode }}
                                className="form-control bg-lighter"
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-5">
                            <label className="mb-2 fw-bold" style={{ color: darkMode ? Text.darkMode : Text.lightMode }} htmlFor="password">Password</label>
                            <input
                                style={{ backgroundColor: darkMode ? Content.darkMode : "#fff", color: darkMode ? Text.darkMode : Text.lightMode }}
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
                                <a className="custom-link" href="/login" style={{ color: darkMode ? Text.darkMode : Text.lightMode }}>Already have an account?</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <footer className="bg-light">
                <div className="text-center" style={{ backgroundColor: darkMode ? Content.darkMode : Content.lightMode, height: "72px" }}>
                    <p style={{ color: darkMode ? Text.darkMode : Text.lightMode, paddingTop: "25px" }}>
                        &copy; {new Date().getFullYear()} Ans2Ask. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Register;