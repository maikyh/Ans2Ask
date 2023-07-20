import React from "react";
import { useState, useEffect, useContext, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.js";
import QuestionGrid from "../QuestionGrid/QuestionGrid";
import "./SearchResults.css";

const LazyNavBar = React.lazy(() => import('../Navbar/Navbar'));
const LazyFooter = React.lazy(() => import('../Footer/Footer'));

const SearchResults = ({searchQuery, handleSetSearchQuery}) => {
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
        <Suspense fallback={<div>Loading...</div>}>
            <LazyNavBar handleSetSearchQuery={handleSetSearchQuery} handleLogout={handleLogout}/>
        </Suspense>
        <div className="d-flex justify-content-center align-items-center" style={{marginBottom: "4rem", marginTop: "3rem"}}>
            <div className="custom-container-home bg-light px-4 pt-4 pb-2">
                <h1 className="text-center mb-2 fw-bold">All Results</h1>
                <div className="row border border-dark my-4"></div>
                <QuestionGrid searchQuery={searchQuery} selectedOption={selectedOption} selectedSubject={selectedSubject}/>
            </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyFooter/>
        </Suspense>
    </div>
  );
}

export default SearchResults;