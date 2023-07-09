import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faSquareRootAlt, faCode, faMicroscope, faHeartbeat, faPalette, faChartLine, faBalanceScale, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faGamepad, faScroll, faFlask, faBolt, faFilm, faGlobeAmericas, faBook, faUtensils, faLanguage } from "@fortawesome/free-solid-svg-icons";
import "./Subjects.css";

export default function Subjects({selectedSubject, handleSetSelectedSubject}) {
  const subjects1 = [
    {
      title: "All",
      icon: <FontAwesomeIcon icon={faBrain} />
    },
    {
      title: "Informatics",
      icon: <FontAwesomeIcon icon={faCode} />
    },
    {
      title: "Mathematics",
      icon: <FontAwesomeIcon icon={faSquareRootAlt} />
    },
    {
      title: "Biology",
      icon: <FontAwesomeIcon icon={faMicroscope} />
    },
    {
      title: "Health",
      icon: <FontAwesomeIcon icon={faHeartbeat} />
    },
    {
      title: "Art",
      icon: <FontAwesomeIcon icon={faPalette} />
    },
    {
      title: "Business",
      icon: <FontAwesomeIcon icon={faChartLine} />
    },
    {
      title: "Law",
      icon: <FontAwesomeIcon icon={faBalanceScale} />
    },
    {
      title: "Investment",
      icon: <FontAwesomeIcon icon={faDollarSign} />
    }
  ];

  const subjects2 = [
    {
      title: "History",
      icon: <FontAwesomeIcon icon={faScroll} />
    },
    {
      title: "Videogames",
      icon: <FontAwesomeIcon icon={faGamepad} />
    },
    {
      title: "Chemistry",
      icon: <FontAwesomeIcon icon={faFlask} />
    },
    {
      title: "Physics",
      icon: <FontAwesomeIcon icon={faBolt} />
    },
    {
      title: "Animation",
      icon: <FontAwesomeIcon icon={faFilm} />
    },
    {
      title: "Geography",
      icon: <FontAwesomeIcon icon={faGlobeAmericas} />
    },
    {
      title: "SAT",
      icon: <FontAwesomeIcon icon={faBook} />
    },
    {
      title: "Food",
      icon: <FontAwesomeIcon icon={faUtensils} />
    },
    {
      title: "Languages",
      icon: <FontAwesomeIcon icon={faLanguage} />
    }
  ];

  return (
    <div className="subjects">
      <div className="row justify-content-center mt-2 mb-2">
        {subjects1.map((subject) => (
          <div style={{ cursor: 'pointer' }} className="col-auto d-flex flex-column align-items-center" onClick={() => handleSetSelectedSubject(subject.title)}>
            {subject.icon}
            <p className="text-center">{subject.title}</p>
          </div>
        ))}
      </div>

      <div className="row justify-content-center">
        {subjects2.map((subject) => (
          <div style={{ cursor: 'pointer' }} className="col-auto d-flex flex-column align-items-center" onClick={() => handleSetSelectedSubject(subject.title)}>
            {subject.icon}
            <p className="text-center">{subject.title}</p>
          </div>
        ))}
      </div>

      <div className="row border border-dark my-4"></div>
      
      <h1 className="text-center mb-2 fw-bold">{selectedSubject}</h1>
    </div>
  );
}
