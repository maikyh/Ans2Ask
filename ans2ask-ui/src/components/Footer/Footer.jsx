import React from "react";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="bg-light py-4 fixed-bottom">
            <div className="container text-center">
                <p className="text-muted mb-0">
                    &copy; {new Date().getFullYear()} Ans2Ask. All rights reserved.
                </p>
            </div>
        </footer>
    );
}