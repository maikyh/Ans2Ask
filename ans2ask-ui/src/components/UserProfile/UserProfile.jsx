import React from "react";
import { useState, useEffect, useContext, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.js";
import Options from "../../utils/OptionsQA.jsx"
import PersonalizedFallback from "../PersonalizedFallback/PersonalizedFallback.jsx";
import "./UserProfile.css";

const LazyNavBar = React.lazy(() => import('../Navbar/Navbar'));
const LazyFooter = React.lazy(() => import('../Footer/Footer'));
const LazyUserCard = React.lazy(() => import('../UserCard/UserCard'));
const LazyQuestionsOrAnswers = React.lazy(() => import('../QuestionsOrAnswers/QuestionsOrAnswers'));
const LazyUserProfileGrid = React.lazy(() => import('../UserProfileGrid/UserProfileGrid'));

const UserProfile = ({handleSetSearchQuery}) => {
  const { user, updateUser } = useContext(UserContext);
  const [selectedOption, setSelectedOption] = useState(Options.questions);

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
    <div className="UserProfile">
        <Suspense fallback={<PersonalizedFallback />}>
            <LazyNavBar handleSetSearchQuery={handleSetSearchQuery} handleLogout={handleLogout}/>
        </Suspense>
        <div className="d-flex justify-content-center align-items-center" style={{marginBottom: "4rem", marginTop: "3rem"}}>
            <div className="custom-container-UserProfile bg-light px-4 pt-4 pb-2">
                <Suspense fallback={<PersonalizedFallback />}>
                  <LazyUserCard user={user} />
                </Suspense>

                <div className="row border border-dark my-4"></div>

                <Suspense fallback={<PersonalizedFallback />}>
                  <LazyQuestionsOrAnswers selectedOption={selectedOption} handleSetSelectedOption={handleSetSelectedOption}/>
                </Suspense>

                <div className="row border border-dark my-4"></div>

                <Suspense fallback={<PersonalizedFallback />}>
                  <LazyUserProfileGrid selectedOption={selectedOption} userId={user.id}/>
                </Suspense>
            </div>
        </div>
        <Suspense fallback={<PersonalizedFallback />}>
          <LazyFooter/>
        </Suspense>
    </div>
  );
}

export default UserProfile;