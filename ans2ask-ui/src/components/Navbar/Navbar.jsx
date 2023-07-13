import React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../UserContext.js";
import { useNavigate } from "react-router-dom";
import { NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./Navbar.css";

export default function Navbar({handleSetSearchQuery, handleLogout}) {
    const { user, updateUser } = useContext(UserContext);
    
    const navigate = useNavigate();

    const handleKeyPress = (event) => {
        const query = event.target.value;
        if (event.key === "Enter") {
            handleSetSearchQuery(query);
            navigate('/search');
        }
    };

    console.log(user);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center w-100">
                    <a className="navbar-brand" href="/home">Ans2Ask</a>
                    <div style={{ marginLeft: "4.75rem", marginRight: "4.75rem" }} className="flex-fill" >
                        <input onKeyDown={handleKeyPress} type="text" className="form-control" />
                    </div>
                    <div className="d-flex align-items-center">
                        <Link to={`/ask`} className="btn btn-outline-dark"> Ask </Link>
                        <div style={{ marginLeft: "1.75rem" }}>
                            <FontAwesomeIcon icon={faBell} />
                        </div>
                        <NavDropdown style={{ marginLeft: "1.75rem" }} alignRight title={<FontAwesomeIcon icon={faUser} />} id="basic-nav-dropdown">
                            <NavDropdown.Item> 
                                {
                                    user && 
                                    <Link style={{ textDecoration: 'none' }} to={`/user/${user.id}`}> View Profile </Link> 
                                }
                                {
                                    !user && 
                                    <Link style={{ textDecoration: 'none' }}> View Profile </Link> 
                                }
                                
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout} style={{ color: "red" }}>
                                <span style={{ color: "red" }}>Log Out &nbsp; </span>
                                <FontAwesomeIcon icon={faSignOutAlt} style={{ color: "red" }} />
                            </NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
            </div>
        </nav>
    );
  }