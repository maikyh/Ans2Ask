import React from "react";
import { useState, useEffect, useContext, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.js";
import QuestionsOrAnswers from "../QuestionsOrAnswers/QuestionsOrAnswers";
import UserProfileGrid from "../UserProfileGrid/UserProfileGrid";
import UserCard from "../UserCard/UserCard";
import Options from "../../utils/OptionsQA.jsx"
import "./UserProfile.css";

const LazyNavBar = React.lazy(() => import('../Navbar/Navbar'));
const LazyFooter = React.lazy(() => import('../Footer/Footer'));

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
        <Suspense fallback={<div>Loading...</div>}>
            <LazyNavBar handleSetSearchQuery={handleSetSearchQuery} handleLogout={handleLogout}/>
        </Suspense>
        <div className="d-flex justify-content-center align-items-center" style={{marginBottom: "4rem", marginTop: "3rem"}}>
            <div className="custom-container-home bg-light px-4 pt-4 pb-2">
                <UserCard user={user} ></UserCard>

                <div className="row border border-dark my-4"></div>

                <QuestionsOrAnswers selectedOption={selectedOption} handleSetSelectedOption={handleSetSelectedOption}/>

                <div className="row border border-dark my-4"></div>

                <UserProfileGrid selectedOption={selectedOption} userId={user.id}></UserProfileGrid>
            </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyFooter/>
        </Suspense>
    </div>
  );
}

export default UserProfile;