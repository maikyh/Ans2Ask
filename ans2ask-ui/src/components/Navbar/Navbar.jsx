import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
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
                        <div style={{ marginLeft: "1.75rem" }}>
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
  }