import React, { useContext } from 'react';
import { UserContext } from '../../UserContext.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faSquareRootAlt, faCode, faMicroscope, faHeartbeat, faPalette, faChartLine, faBalanceScale, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faGamepad, faScroll, faFlask, faBolt, faFilm, faGlobeAmericas, faBook, faUtensils, faLanguage } from "@fortawesome/free-solid-svg-icons";
import "./Subjects.css";

const Subjects = ({selectedSubject, handleSetSelectedSubject}) => {
  const { darkMode } = useContext(UserContext);

  const subjects1 = [
    {
      title: <p style={{ color: darkMode ? "white" : "" }}>All</p>,
      icon: <FontAwesomeIcon style={{ color: darkMode ? "white" : "" }} icon={faBrain} />
    },
    {
      title: <p style={{ color: darkMode ? "white" : "" }}>Informatics</p>,
      icon: <FontAwesomeIcon style={{ color: darkMode ? "white" : "" }} icon={faCode} />
    },
    {
      title: <p style={{ color: darkMode ? "white" : "" }}>Mathematics</p>,
      icon: <FontAwesomeIcon style={{ color: darkMode ? "white" : "" }} icon={faSquareRootAlt} />
    },
    {
      title: <p style={{ color: darkMode ? "white" : "" }}>Biology</p>,
      icon: <FontAwesomeIcon style={{ color: darkMode ? "white" : "" }} icon={faMicroscope} />
    },
    {
      title: <p style={{ color: darkMode ? "white" : "" }}>Health</p>,
      icon: <FontAwesomeIcon style={{ color: darkMode ? "white" : "" }} icon={faHeartbeat} />
    },
    {
      title: <p style={{ color: darkMode ? "white" : "" }}>Art</p>,
      icon: <FontAwesomeIcon style={{ color: darkMode ? "white" : "" }} icon={faPalette} />
    },
    {
      title: <p style={{ color: darkMode ? "white" : "" }}>Business</p>,
      icon: <FontAwesomeIcon style={{ color: darkMode ? "white" : "" }} icon={faChartLine} />
    },
    {
      title: <p style={{ color: darkMode ? "white" : "" }}>Law</p>,
      icon: <FontAwesomeIcon style={{ color: darkMode ? "white" : "" }} icon={faBalanceScale} />
    },
    {
      title: <p style={{ color: darkMode ? "white" : "" }}>Investment</p>,
      icon: <FontAwesomeIcon style={{ color: darkMode ? "white" : "" }} icon={faDollarSign} />
    }
  ];

  const subjects2 = [
    {
      title: <p style={{ color: darkMode ? "white" : "" }}>History</p>,
      icon: <FontAwesomeIcon style={{ color: darkMode ? "white" : "" }} icon={faScroll} />
    },
    {
      title: <p style={{ color: darkMode ? "white" : "" }}>Videogames</p>,
      icon: <FontAwesomeIcon style={{ color: darkMode ? "white" : "" }} icon={faGamepad} />
    },
    {
      title: <p style={{ color: darkMode ? "white" : "" }}>Chemistry</p>,
      icon: <FontAwesomeIcon style={{ color: darkMode ? "white" : "" }} icon={faFlask} />
    },
    {
      title: <p style={{ color: darkMode ? "white" : "" }}>Physics</p>,
      icon: <FontAwesomeIcon style={{ color: darkMode ? "white" : "" }} icon={faBolt} />
    },
    {
      title: <p style={{ color: darkMode ? "white" : "" }}>Animation</p>,
      icon: <FontAwesomeIcon style={{ color: darkMode ? "white" : "" }} icon={faFilm} />
    },
    {
      title: <p style={{ color: darkMode ? "white" : "" }}>Geography</p>,
      icon: <FontAwesomeIcon style={{ color: darkMode ? "white" : "" }} icon={faGlobeAmericas} />
    },
    {
      title: <p style={{ color: darkMode ? "white" : "" }}>SAT</p>,
      icon: <FontAwesomeIcon style={{ color: darkMode ? "white" : "" }} icon={faBook} />
    },
    {
      title: <p style={{ color: darkMode ? "white" : "" }}>Food</p>,
      icon: <FontAwesomeIcon style={{ color: darkMode ? "white" : "" }} icon={faUtensils} />
    },
    {
      title: <p style={{ color: darkMode ? "white" : "" }}>Languages</p>,
      icon: <FontAwesomeIcon style={{ color: darkMode ? "white" : "" }} icon={faLanguage} />
    }
  ];

  return (
    <div className="subjects">
      <div className="row justify-content-center mt-2 mb-2">
        {subjects1.map((subject) => (
          <div
            key={subject.title}
            style={{ cursor: 'pointer' }}
            className="col-auto d-flex flex-column align-items-center subject-container" 
            onClick={() => handleSetSelectedSubject(subject.title)}
          >
            {subject.icon}
            <p className="text-center">{subject.title}</p>
          </div>
        ))}
      </div>
  
      <div className="row justify-content-center">
        {subjects2.map((subject) => (
          <div
            key={subject.title}
            style={{ cursor: 'pointer' }}
            className="col-auto d-flex flex-column align-items-center subject-container"
            onClick={() => handleSetSelectedSubject(subject.title)}
          >
            {subject.icon}
            <p className="text-center">{subject.title}</p>
          </div>
        ))}
      </div>
  
      <div className={`row border ${darkMode ? "border-white" : "border-dark"} my-4`}></div>
      
      <h1 className="text-center mb-2 fw-bold" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}  >{selectedSubject}</h1>
    </div>
  );
}

export default Subjects;