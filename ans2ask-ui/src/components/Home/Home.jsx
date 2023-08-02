import React from "react";
import { useState, useEffect, useContext, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.js";
import Options from "../../utils/OptionsQC.jsx";
import PersonalizedFallback from "../PersonalizedFallback/PersonalizedFallback.jsx";
import Content from '../../utils/Content.jsx';
import "./Home.css";

const LazyNavBar = React.lazy(() => import('../Navbar/Navbar'));
const LazyFooter = React.lazy(() => import('../Footer/Footer'));
const LazySubjects = React.lazy(() => import('../Subjects/Subjects'));
const LazyQuestionsOrCourses = React.lazy(() => import('../QuestionsOrCourses/QuestionsOrCourses'));
const LazyQuestionGrid = React.lazy(() => import('../QuestionGrid/QuestionGrid'));

const Home = ({images, handleSetSearchQuery}) => {
  const { user, updateUser, darkMode } = useContext(UserContext);
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
        <Suspense fallback={<PersonalizedFallback />}>
            <LazyNavBar images={images} handleSetSearchQuery={handleSetSearchQuery} handleLogout={handleLogout}/>
        </Suspense>
        <div className="d-flex justify-content-center align-items-center" style={{marginBottom: "4rem", marginTop: "3rem"}}>
            <div className="custom-container-home bg- px-4 pt-4 pb-2" style={{ backgroundColor: darkMode ? Content.darkMode : Content.lightMode }}>
                <Suspense fallback={<PersonalizedFallback />}>
                  <LazySubjects selectedSubject={selectedSubject} handleSetSelectedSubject={handleSetSelectedSubject} />
                </Suspense>
                <Suspense fallback={<PersonalizedFallback />}>
                  <LazyQuestionsOrCourses selectedOption={selectedOption} handleSetSelectedOption={handleSetSelectedOption}/>
                </Suspense>
                <Suspense fallback={<PersonalizedFallback />}>
                  <LazyQuestionGrid images={images} searchQuery={""} selectedOption={selectedOption} selectedSubject={selectedSubject}/>
                </Suspense>
            </div>
        </div>
        <Suspense fallback={<PersonalizedFallback />}>
          <LazyFooter/>
        </Suspense>
    </div>
  );
}

export default Home;