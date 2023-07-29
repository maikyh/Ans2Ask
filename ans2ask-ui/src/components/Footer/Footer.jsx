import React, { useContext } from 'react';
import { UserContext } from '../../UserContext.js';
import "./Footer.css";

const Footer = () => {
    const { darkMode } = useContext(UserContext);
    
    return (
        <footer className="fixed-bottom" style={{ backgroundColor: darkMode ? "#2D3748" : "rgba(248,249,250,1)", height:"72px"}}>
            <div className="container text-center">
                <p style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)", paddingTop: "25px"}} className="mb-0">
                    &copy; {new Date().getFullYear()} Ans2Ask. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;