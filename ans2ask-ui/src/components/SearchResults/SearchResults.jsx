import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.js";
import Navbar from "../Navbar/Navbar";
import QuestionGrid from "../QuestionGrid/QuestionGrid";
import Footer from "../Footer/Footer";
import "./SearchResults.css";

export default function SearchResults({searchQuery, handleSetSearchQuery}) {
  const { user, updateUser } = useContext(UserContext);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedOption, setSelectedOption] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    if(!user) {
      navigate('/login');
    }
  }, [user]);
  
  const handleLogout = () => {
    updateUser(null);
    navigate('/login');
  };

  return (
    <div className="">
        <Navbar handleSetSearchQuery={handleSetSearchQuery} handleLogout={handleLogout}/>
        <div className="d-flex justify-content-center align-items-center" style={{marginBottom: "4rem", marginTop: "3rem"}}>
            <div className="custom-container-home bg-light px-4 pt-4 pb-2">
                <h1 className="text-center mb-2 fw-bold">All Results</h1>
                <div className="row border border-dark my-4"></div>
                <QuestionGrid searchQuery={searchQuery} selectedOption={selectedOption} selectedSubject={selectedSubject}/>
            </div>
        </div>
        <Footer/>
    </div>
  );
}
