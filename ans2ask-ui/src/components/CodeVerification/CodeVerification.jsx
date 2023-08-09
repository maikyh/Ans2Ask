import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext.js';
import { url } from "../../utils/Constants.jsx";
import { Button } from "@chakra-ui/button";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { PinInput, PinInputField } from '@chakra-ui/react'
import Swal from 'sweetalert2';
import Text from '../../utils/Text.jsx';
import Content from '../../utils/Content.jsx';
import "./CodeVerification.css";

const CodeVerification = () => {
    const [code, setCode] = useState('');
    const { darkMode, updateDarkMode } = useContext(UserContext);

    const navigate = useNavigate();

    const handleVerifyAccount = async (e) => {
        e.preventDefault();

        const token = code;
        try {
            const response = await fetch(url + `/tokens/verify/${token}`);
            const data = await response.json();

            console.log(data);
        }
        catch(e){
            console.log(e);
        }

    }

    return (
        <div className="login">
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: darkMode ? Content.darkMode : Content.lightMode }}>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <a className="navbar-brand" style={{ color: darkMode ? Text.darkMode : Text.lightMode }} href="#">Ans2Ask</a>
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

            <div className="d-flex justify-content-center align-items-center custom-margin-login" style={{ height: "764px" }}>
                <div className="custom-container p-4 border rounded px-5" style={{ backgroundColor: darkMode ? Content.darkMode : Content.lightMode }}>
                    <h1 className="text-center mb-4 fw-bold" style={{ color: darkMode ? Text.darkMode : Text.lightMode }}>Confirm your account</h1>
                    <form onSubmit={handleVerifyAccount}>
                        <div className="form-group mb-4">
                            <label className="mb-2 fw-bold" htmlFor="usernameOrEmail" style={{ color: darkMode ? Text.darkMode : Text.lightMode }}>A code has been sent to your email. Enter that code here:</label>
                            <div className='text-center mt-2'>
                                <PinInput size="lg" onChange={(e) => setCode(e)}>
                                    <PinInputField className='mx-2 text-white' />
                                    <PinInputField className='mx-2 text-white' />
                                    <PinInputField className='mx-2 text-white' />
                                    <PinInputField className='mx-2 text-white' />
                                </PinInput>
                            </div>
                        </div>
                        <div className="text-center">
                            <button className={`btn ${darkMode ? 'btn-light' : 'btn-dark'} w-100 d-block fw-bold mb-4`}> Submit </button>
                            <div className="mb-2">
                                <a className="custom-link" href="/recover" style={{ color: darkMode ? Text.darkMode : Text.lightMode }}>Not your account?</a>
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

export default CodeVerification;