import React from "react";
import { NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.css';
import "./Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center w-100">
                    <a className="navbar-brand" href="#">Ans2Ask</a>
                    <div style={{ marginLeft: "4.75rem", marginRight: "4.75rem" }} className="flex-fill" >
                        <input type="text" className="form-control" />
                    </div>
                    <div className="d-flex align-items-center">
                        <button type="button" className="btn btn-outline-dark">Ask</button>
                        <div style={{ marginLeft: "1.75rem" }}>
                            <FontAwesomeIcon icon={faBell} />
                        </div>
                        <NavDropdown style={{ marginLeft: "1.75rem" }} alignRight title={<FontAwesomeIcon icon={faUser} />} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#profile">View Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#logout">Log Out &nbsp; <FontAwesomeIcon icon={faSignOutAlt} /></NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
            </div>
        </nav>
    );
  }