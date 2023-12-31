import React from "react";
import { useState, useContext, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.js";
import PersonalizedFallback from "../PersonalizedFallback/PersonalizedFallback.jsx";
import Text from '../../utils/Text.jsx';
import Content from '../../utils/Content.jsx';
import "./SearchResults.css";

const LazyNavBar = React.lazy(() => import('../Navbar/Navbar'));
const LazyQuestionGrid = React.lazy(() => import('../QuestionGrid/QuestionGrid'));
const LazyFooter = React.lazy(() => import('../Footer/Footer'));

const SearchResults = ({ images, searchQuery, handleSetSearchQuery }) => {
    const { updateUser, darkMode } = useContext(UserContext);
    const [selectedSubject, setSelectedSubject] = useState("All");
    const [selectedOption, setSelectedOption] = useState(1);

    const navigate = useNavigate();

    const handleLogout = () => {
        updateUser(null);
        navigate('/login');
    };

    return (
        <div className="">
            <Suspense fallback={<PersonalizedFallback />}>
                <LazyNavBar images={images} handleSetSearchQuery={handleSetSearchQuery} handleLogout={handleLogout} />
            </Suspense>
            <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: darkMode ? "#1A202C" : "", marginBottom: "4rem", marginTop: "3rem" }}>
                <div className="custom-container-searchResults px-4 pt-4 pb-2" style={{ backgroundColor: darkMode ? Content.darkMode : Content.lightMode }}>
                    <h1 className="text-center mb-2 fw-bold" style={{ color: darkMode ? Text.darkMode : Text.lightMode }}>All Results</h1>
                    <div className={`row border ${darkMode ? "border-white" : "border-dark"} my-4`}></div>
                    <Suspense fallback={<PersonalizedFallback />}>
                        <LazyQuestionGrid images={images} searchQuery={searchQuery} selectedOption={selectedOption} selectedSubject={selectedSubject} />
                    </Suspense>
                </div>
            </div>
            <Suspense fallback={<PersonalizedFallback />}>
                <LazyFooter />
            </Suspense>
        </div>
    );
}

export default SearchResults;