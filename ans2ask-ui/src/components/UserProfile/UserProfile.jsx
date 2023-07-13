import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import QuestionsOrAnswers from "../QuestionsOrAnswers/QuestionsOrAnswers";
import UserProfileGrid from "../UserProfileGrid/UserProfileGrid";
import "./UserProfile.css";

export default function UserProfile({handleSetSearchQuery}) {
  const { user, updateUser } = useContext(UserContext);
  const [selectedOption, setSelectedOption] = useState(1);
  // 1 == Questions
  // 2 == Answers

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
    navigate('/login');
  };

  return (
    <div className="home">
        <Navbar handleSetSearchQuery={handleSetSearchQuery} handleLogout={handleLogout}/>
        <div className="d-flex justify-content-center align-items-center">
            <div className="custom-container-home bg-light px-4 pt-4 pb-2">
                <div className="d-flex">
                    <FontAwesomeIcon className="fa-10x" icon={faUser} />
                    <FontAwesomeIcon className="fa-10x" icon={faUser} />
                    <FontAwesomeIcon className="fa-10x" icon={faUser} />
                        {user.username}
                        {user.email}
                </div>
                <div className="row border border-dark my-4"></div>

                <QuestionsOrAnswers selectedOption={selectedOption} handleSetSelectedOption={handleSetSelectedOption}/>

                <div className="row border border-dark my-4"></div>

                <UserProfileGrid selectedOption={selectedOption} userId={user.id}></UserProfileGrid>
            </div>
        </div>
        <Footer/>
    </div>
  );
}
