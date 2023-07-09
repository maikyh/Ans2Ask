import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.js";
import Navbar from "../Navbar/Navbar";
import QuestionGrid from "../QuestionGrid/QuestionGrid";
import Footer from "../Footer/Footer";
import "./SearchResults.css";

export default function Home() {
  const { user, updateUser } = useContext(UserContext);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedOption, setSelectedOption] = useState(1);

  const handleSetSelectedSubject = (subject) => {
    setSelectedSubject(subject);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if(!user) {
      navigate('/login');
    }
  }, [user]);
  
  const handleLogout = () => {
    updateUser(null);
  };

  return (
    <div className="">
        <Navbar handleLogout={handleLogout}/>
        <div className="d-flex justify-content-center align-items-center">
            <div className="custom-container-home bg-light px-4 pt-4 pb-2">
                <h1 className="text-center mb-2 fw-bold">All Results</h1>
                <div className="row border border-dark my-4"></div>
                <QuestionGrid selectedOption={selectedOption} selectedSubject={selectedSubject}/>
            </div>
        </div>
        <Footer/>
    </div>
  );
}
