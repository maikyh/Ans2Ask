import React from "react";
import { useState, useEffect, useContext, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.js";
import QuestionGrid from "../QuestionGrid/QuestionGrid";
import QuestionsOrCourses from "../QuestionsOrCourses/QuestionsOrCourses";
import Options from "../../utils/OptionsQC.jsx";
import Subjects from "../Subjects/Subjects";
import "./Home.css";
const LazyNavBar = React.lazy(() => import('../Navbar/Navbar'));
const LazyFooter = React.lazy(() => import('../Footer/Footer'));

const Home = ({handleSetSearchQuery}) => {
  const { user, updateUser } = useContext(UserContext);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedOption, setSelectedOption] = useState(Options.question);

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
    navigate('/login');
  };

  return (
    <div className="home">
        <Suspense fallback={<div>Loading...</div>}>
            <LazyNavBar handleSetSearchQuery={handleSetSearchQuery} handleLogout={handleLogout}/>
        </Suspense>
        <div className="d-flex justify-content-center align-items-center" style={{marginBottom: "4rem", marginTop: "3rem"}}>
            <div className="custom-container-home bg-light px-4 pt-4 pb-2">
                <Subjects selectedSubject={selectedSubject} handleSetSelectedSubject={handleSetSelectedSubject} />
                <QuestionsOrCourses selectedOption={selectedOption} handleSetSelectedOption={handleSetSelectedOption}/>
                <QuestionGrid searchQuery={""} selectedOption={selectedOption} selectedSubject={selectedSubject}/>
            </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyFooter/>
        </Suspense>
    </div>
  );
}

export default Home;