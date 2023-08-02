import React, { useContext } from 'react';
import { UserContext } from '../../UserContext.js';
import Text from '../../utils/Text.jsx';
import Content from '../../utils/Content.jsx';
import "./Footer.css";

const Footer = () => {
    const { darkMode } = useContext(UserContext);
    
    return (
        <footer className="fixed-bottom" style={{ backgroundColor: darkMode ? Content.darkMode : Content.lightMode, height:"65px"}}>
            <div className="container text-center">
                <p style={{color: darkMode ? Text.darkMode : Text.lightMode, paddingTop: "25px"}} className="m-0">
                    &copy; {new Date().getFullYear()} Ans2Ask. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;