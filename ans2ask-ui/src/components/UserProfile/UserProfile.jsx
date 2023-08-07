import React from "react";
import { useState, useEffect, useContext, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { UserContext } from "../../UserContext.js";
import Options from "../../utils/OptionsQA.jsx"
import PersonalizedFallback from "../PersonalizedFallback/PersonalizedFallback.jsx";
import Content from '../../utils/Content.jsx';
import "./UserProfile.css";

const LazyNavBar = React.lazy(() => import('../Navbar/Navbar'));
const LazyFooter = React.lazy(() => import('../Footer/Footer'));
const LazyUserCard = React.lazy(() => import('../UserCard/UserCard'));
const LazyPersonalUserCard = React.lazy(() => import('../PersonalUserCard/PersonalUserCard'));
const LazyQuestionsOrAnswers = React.lazy(() => import('../QuestionsOrAnswers/QuestionsOrAnswers'));
const LazyUserProfileGrid = React.lazy(() => import('../UserProfileGrid/UserProfileGrid'));

const UserProfile = ({ images, handleSetSearchQuery }) => {
    const { user, updateUser, darkMode } = useContext(UserContext);
    const [selectedOption, setSelectedOption] = useState(Options.questions);
    const { id } = useParams();

    const handleSetSelectedOption = (option) => {
        setSelectedOption(option);
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
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
                <LazyNavBar images={images} handleSetSearchQuery={handleSetSearchQuery} handleLogout={handleLogout} />
            </Suspense>
            <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: darkMode ? "#1A202C" : "", marginBottom: "4rem", marginTop: "3rem" }}>
                <div className="custom-container-UserProfile px-2 pt-3 pb-2" style={{ backgroundColor: darkMode ? Content.darkMode : Content.lightMode }}>
                    <Suspense fallback={<PersonalizedFallback />}>
                        {user.id === parseInt(id) ? <LazyPersonalUserCard images={images} user={user} /> : <LazyUserCard images={images} user={user} />}
                    </Suspense>

                    <div className={`row border ${darkMode ? "border-grey" : "border-dark"} my-4 mx-0`}></div>

                    <Suspense fallback={<PersonalizedFallback />}>
                        <LazyQuestionsOrAnswers selectedOption={selectedOption} handleSetSelectedOption={handleSetSelectedOption} />
                    </Suspense>

                    <div className={`row border ${darkMode ? "border-grey" : "border-dark"} my-4 mx-0`}></div>

                    <Suspense fallback={<PersonalizedFallback />}>
                        <LazyUserProfileGrid images={images} selectedOption={selectedOption} />
                    </Suspense>
                </div>
            </div>
            <Suspense fallback={<PersonalizedFallback />}>
                <LazyFooter />
            </Suspense>
        </div>
    );
}

export default UserProfile;