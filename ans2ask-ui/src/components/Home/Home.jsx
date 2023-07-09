import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.js";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import QuestionGrid from "../QuestionGrid/QuestionGrid";
import QuestionsOrCourses from "../QuestionsOrCourses/QuestionsOrCourses";
import Subjects from "../Subjects/Subjects";
import "./Home.css";

export default function Home() {
  const { user, updateUser } = useContext(UserContext);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedOption, setSelectedOption] = useState(1);
  // 1 == Questions
  // 2 == Courses

  const handleSetSelectedSubject = (subject) => {
    setSelectedSubject(subject);
  };

  const handleSetSelectedOption = (option) => {
    setSelectedOption(option);
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
    <div className="home">
        <Navbar handleLogout={handleLogout}/>
        <div className="d-flex justify-content-center align-items-center">
            <div className="custom-container-home bg-light px-4 pt-4 pb-2">
                <Subjects selectedSubject={selectedSubject} handleSetSelectedSubject={handleSetSelectedSubject} />
                <QuestionsOrCourses selectedOption={selectedOption} handleSetSelectedOption={handleSetSelectedOption}/>
                <QuestionGrid selectedOption={selectedOption} selectedSubject={selectedSubject}/>
            </div>
        </div>
        <Footer/>
    </div>
  );
}
